import {
  assert,
  assertEquals,
  Args,
  Server,
} from './deps.ts'
import { appendReloadScript, encode } from './utils/utils.ts'
import serve from './mod.ts'

let serverProcess: null|Deno.ChildProcess
let port = 6060
const { test } = Deno

async function setup(args?: Args): Promise<void> {
  const cmd = [
    Deno.execPath(),
    'run',
    '-A',
    './mod.ts',
    './demo',
    // '-d',
  ]

  args && args.c && cmd.push('-c')
  args && args.n && cmd.push('-n')
  args && args.before && cmd.push(`--before=${args.before}`)

  if (args && args.p) {
    port = args.p
  } else {
    port = 6060
  }

  cmd.push(`-p${port}`)
  serverProcess = new Deno.Command(
    cmd.shift() as any, {
      args: cmd,
      stdout: 'null',
      //   stderr: 'null',
    }
  ).spawn()
  // serverProcess.ref()
  
  while (1) {
    try {
      const res = await fetch(`http://localhost:${port}`)
      const text = await res.text()
      break
    } catch (error) {
      
    }
  }
}

async function tearDown(): Promise<void> {
  serverProcess?.kill("SIGSTOP")
  ;(new Promise((resolve)=>setTimeout(resolve, 500))).then(()=>{
    serverProcess?.kill("SIGKILL")
  })
  await serverProcess?.output()
}

test('should serve on given port', async (): Promise<void> => {
  await setup({ _: ['./demo'], p: 7001 })
  try {
    const res = await fetch(`http://localhost:${port}`)
    await res.text()
    assertEquals(port, 7001)
    assertEquals(res.status, 200)
    assert(res.headers.has('content-type'))
  } finally {
    await tearDown()
  }
})

test('handleRouteRequest should return index.html', async (): Promise<void> => {
  await setup()
  try {
    const res = await fetch(`http://localhost:${port}`)
    const file = await res.text()
    assertEquals(res.status, 200)
    assert(res.headers.has('content-type'))
    assert(file.includes(`<div id="archaeopteryx">`))
  } finally {
    await tearDown()
  }
})

test('handleDirRequest should return a directory', async (): Promise<void> => {
  await setup({ _: ['./demo'], })
  try {
    const res = await fetch(`http://localhost:${port}/src`)
    const file = await res.text()
    assertEquals(res.status, 200)
    assert(res.headers.has('content-type'))
    assert(file.includes(`<title>archaeopteryx - /src</title>`))
    assert(file.includes(`test.md`))
  } finally {
    await tearDown()
  }
})

test('index.html should contain reload script', async (): Promise<void> => {
  await setup()
  try {
    const res = await fetch(`http://localhost:${port}`)
    const file = await res.text()
    assertEquals(res.status, 200)
    assert(res.headers.has('content-type'))
    assert(file.includes(appendReloadScript('', 6060, '127.0.0.1', false)))
  } finally {
    await tearDown()
  }
})

test('given no reload option index.html should not contain reload script', async (): Promise<void> => {
  await setup({ _: ['./demo'], n: true })
  try {
    const res = await fetch(`http://localhost:${port}`)
    const file = await res.text()
    assertEquals(res.status, 200)
    assert(res.headers.has('content-type'))
    assert(!file.includes(appendReloadScript('', 6060, '127.0.0.1', false)))
  } finally {
    await tearDown()
  }
})

test('/style.css should return style.css from ./demo', async (): Promise<void> => {
  await setup()
  try {
    const res = await fetch(`http://localhost:${port}/style.css`)
    const file = await res.text()
    assertEquals(res.status, 200)
    assert(res.headers.has('content-type'))
    const localFile = new TextDecoder().decode(
      await Deno.readFile('./demo/style.css')
    )
    assert(file, localFile)
  } finally {
    await tearDown()
  }
})

test('given a path to file not found should return 404', async (): Promise<void> => {
  await setup()
  try {
    const res = await fetch(`http://localhost:${port}/does-not-exist.js`)
    const file = await res.text()
    assertEquals(res.status, 404)
    assertEquals(res.statusText, 'Not Found')
    assert(file.includes('<title>404</title>'))
  } finally {
    await tearDown()
  }
})

test('when cors enabled response should have access control header', async (): Promise<void> => {
  await setup({ _: ['./demo'], c: true })
  try {
    const res = await fetch(`http://localhost:${port}`)
    const file = await res.text()
    assertEquals(res.status, 200)
    assert(res.headers.has('content-type'))
    assert(res.headers.has('access-control-allow-origin'))
    assert(file.includes(`<div id="archaeopteryx">`))
  } finally {
    await tearDown()
  }
})

/* Programmatic use */
let archaeopteryx: Server
test({
  name: 'should be able to be used programmaticaly',
  fn: async (): Promise<void> => {
    try {
      archaeopteryx = await serve({ root: './demo', cors: true })
      const res = await fetch(`http://localhost:8080`)
      const file = await res.text()
      assertEquals(res.status, 200)
      assert(res.headers.has('content-type'))
      assert(res.headers.has('access-control-allow-origin'))
      assert(file.includes(`<div id="archaeopteryx">`))
    } finally {
      if (archaeopteryx) {
        archaeopteryx.close()
      }
    }
  },
})

test({
  name: 'options can be passed to the serve function',
  fn: async (): Promise<void> => {
    try {
      archaeopteryx = await serve({ root: './demo', cors: true, port: 4000 })
      const res = await fetch(`http://localhost:4000`)
      const file = await res.text()
      assertEquals(res.status, 200)
      assert(res.headers.has('content-type'))
      assert(res.headers.has('access-control-allow-origin'))
      assert(file.includes(`<div id="archaeopteryx">`))
    } finally {
      await archaeopteryx.close()
    }
  },
})

test({
  name: 'options are read from config file if it exists',
  fn: async (): Promise<void> => {
    const config = `
  {
    "root": "./demo",
    "disableReload": false,
    "silent": false,
    "port": 6060,
    "debug": false,
    "secure": false,
    "cors": true,
    "entryPoint": "index.html"
  }
  `
    const encoded = encode(config)
    await Deno.writeFile(`./demo/archaeopteryx.json`, encoded)
    await setup()

    try {
      const res = await fetch(`http://localhost:6060`)
      const text = await res.text()
      assertEquals(res.status, 200)
      assert(res.headers.has('content-type'))
      assert(res.headers.has('access-control-allow-origin'))
      assert(text.includes(`<div id="archaeopteryx">`))
    } finally {
      await Deno.remove(`./demo/archaeopteryx.json`)
      await tearDown()
    }
  },
})

test('before intercepts requests', async (): Promise<void> => {
  await setup({ _: ['./demo'], before: 'before.ts' })
  try {
    const res = await fetch(`http://localhost:${port}`)
    await res.text()
    assertEquals(res.status, 200)
  } finally {
    await tearDown()
  }
})

// Re-enable this test when this has been resolved:
// https://github.com/denoland/deno/issues/5760
// test('should be able to be used programmaticaly using HTTPS', async (): Promise<
//   void
// > => {
//   try {
//     archaeopteryx = await serve({
//       root: './demo',
//       cors: true,
//       secure: true,
//       port: 6062,
//     })
//     const res = await fetch(`https://localhost:6062`)
//     const file = await res.text()
//     assertEquals(res.status, 200)
//     assert(res.headers.has('content-type'))
//     assert(res.headers.has('access-control-allow-origin'))
//     assert(file.includes(`<div id="archaeopteryx">`))
//   } finally {
//     archaeopteryx.close()
//   }
// })