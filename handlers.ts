import {
  acceptWebSocket,
  ServerRequest,
  posix,
} from './deps.ts'

/* Archaeopteryx utils */
import {
  readFile,
  appendReloadScript,
  error,
  inject404,
  setHeaders,
  encode,
  joinPath,
  DirEntry,
} from './utils/utils.ts'

import dirTemplate from './directory.ts'
import { pathPiecesPosix } from "https://esm.sh/gh/jeff-hykin/good-js@1.14.3.0/source/flattened/path_pieces_posix.js"


// is caught
export const handleFileRequest = async (settings: any, req: ServerRequest, path: string) => {
  if (settings.debug) {
      console.log(`start of handleFileRequest()`)
      console.log(`    path is:`,path)
  }
  try {
    const file = await Deno.open(path)
    req.done.then(() => {
      file.close()
    })
    // is caught 
    return await req.respond({
      status: 200,
      headers: setHeaders(settings.cors, path),
      body: file,
    }).catch(err=>{
        if (`${err}`=="BrokenPipe: Broken pipe (os error 32)") {
            if (!settings.cors) {
                console.warn(`There may have been a CORS issue. Try setting the --cors flag if you're having problems.`)
            }
            return
        }
        throw err
    })
  } catch (err) {
    !settings.silent && settings.debug ? console.error(err) : error(err)
    // is caught
    await handleNotFound(settings, req)
  }
}

// is caught
export const handleDirRequest = async (settings: any, req: ServerRequest, path: string): Promise<void> => {
  const dirUrl = `/${posix.relative(settings.root, path)}`
  const entries: DirEntry[] = []
  for await (const entry of Deno.readDir(path.replace(/\/$/, ''))) {
    const filePath = posix.join(dirUrl, '/', entry.name)
    entries.push({ ...entry, url: decodeURIComponent(filePath) })
  }

  await req.respond({
    status: 200,
    body: encode(dirTemplate(entries, dirUrl)),
    headers: setHeaders(settings.cors),
  })
}

export const handleFileOrFolderRequest = async (settings: any, req: ServerRequest): Promise<void> => {
  const pathUrlOld = req?.url ? pathPiecesPosix(req?.url)[0].join("/") : null
  const relativePartFromReqest = (pathUrlOld || new URL(req.headers.get('referer')).pathname).slice(1) // remove leading slash with slice
  const [ folders, name, extension ] = pathPiecesPosix(relativePartFromReqest)
  const relativePath = folders.join("/")
  let path = joinPath(settings.root, unescape(relativePath), unescape(req.url))
  if (settings.debug) {
    console.debug(`handleFileOrFolderRequest()`)
    console.debug(`    path is:`,path)
  }
  let itemExists = false
  let itemInfo
  
  try {
    itemInfo = await Deno.stat(path)
    itemExists = true
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err
    }
  }
  
  // try as absolute path (NOTE: there is no way to perfectly differentiate absolute VS relative in the request)
  if (settings.allowAbsolute && !itemExists) {
    try {
      path = `/${unescape(req.url)}`
      itemInfo = await Deno.stat(path)
      itemExists = true
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) {
        throw err
      }
    }
  }
  
  let output
  if (!itemExists) {
    if (!settings.silent) {
        console.warn(`not found: ${req.url}`)
    }
    output = await handleNotFound(settings, req)
  } else {
    if (!itemInfo?.isDirectory) {
      return await handleFileRequest(settings, req, path)
    } else {
      if (settings.dontList) {
        // is caught
        return await handleNotFound(settings, req)
      } else {
        return await handleDirRequest(settings, req, path)
      }
    }
  }
  
  return output
}

// is caught
export const handleRouteRequest = async (settings: any, req: ServerRequest): Promise<void> => {
  if (settings.debug) {
    console.log(`start of handleRouteRequest()`)
  }
  try {
    const path = `${settings.root}/${settings.entryPoint}`
    const file = await readFile(path)
    const { hostname, port } = req.conn.localAddr as Deno.NetAddr
    // is caught
    await req.respond({
      status: 200,
      headers: setHeaders(settings.cors, path),
      body: settings.disableReload
        ? file
        : appendReloadScript(file, port, hostname, settings.secure),
    })
  } catch (err) {
    const expectedError = `${err?.message}`.startsWith("No such file or directory (os error 2): readfile './index.html'")
    if (!expectedError) {
      !settings.silent && settings.debug ? console.error(err) : error(err)
    }
    // is caught
    const path = joinPath(settings.root, unescape(req.url))
    await handleDirRequest(settings, req, path)
  }
}

let watcher = null as null|Deno.FsWatcher
export const handleWs = async (settings: any, req: ServerRequest): Promise<void> => {
  if (!watcher) {
    watcher = Deno.watchFs(settings.root, { recursive: true })
  }
  try {
    const { conn, r: bufReader, w: bufWriter, headers } = req
    const socket = await acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })

    for await (const event of watcher) {
      if (event.kind === 'modify') {
        await socket.send('reload')
      }
    }
  } catch (err) {
    !settings.silent && error(err)
  }
}

// is caught
export const handleNotFound = async (settings: any, req: ServerRequest): Promise<void> => {
  return req.respond({
    status: 404,
    headers: setHeaders(settings.cors),
    body: inject404(req.url),
  })
}
