export default (resource: string) =>
  `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charset="utf-8" />
      <title>404</title>
    </head>
    <style>
      html,
      body {
        height: 100vh;
        width: 100vw;
        font-family: Helvetica, Arial, sans-serif;
        box-sizing: border-box;
        background-color: #fff;
        margin: 0;
        padding: 0;
      }
  
      #archaeopteryx {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
  
      #archaeopteryx > h1 {
        font-size: 48px;
        margin-bottom: 16px;
        color: #726f7b;
      }
  
      #archaeopteryx > p {
        color: #c4c4c4;
        text-align: center;
      }
  
      #archaeopteryx > div {
        display: flex;
      }
  
      strong {
        opacity: 0.2;
        font-weight: 200;
      }
  
      svg {
        margin-bottom: 16px;
      }
    </style>
    <body>
      <div id="archaeopteryx">
        <h1>404</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 619.77 283.96"
          width="200"
        >
          <defs>
            <style>
              .cls-1 {
                fill: #ff825e;
              }
              .cls-2 {
                fill: #333;
              }
              .cls-3 {
                fill: #ffc59f;
              }
            </style>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                class="cls-1"
                d="M345,201.1s191.78,26.23,149-23C494,178.12,360.34,110.8,345,201.1Z"
              />
              <path
                class="cls-2"
                d="M436.9,215.66c-35.62,0-75-4.75-92.88-7.19l-7.61-1.05,1.28-7.57c3.71-21.86,14.14-37.27,31-45.8C415.1,130.59,494,169.8,497.36,171.48l1.31.65.95,1.11c10.08,11.58,8.88,20.15,6.1,25.3C498.59,211.73,469.3,215.66,436.9,215.66ZM354,194.78c63.32,8,132.16,8.6,138.59-3.31.55-1-.3-3.63-3.29-7.35-10.28-4.91-77.17-35.39-114-16.78C364.75,172.72,357.73,181.73,354,194.78Z"
              />
              <path
                class="cls-1"
                d="M146.3,201.68c55,35.06,104.09-15.5,104.09-15.5S235.51,132.73,181,152.57,146.3,201.68,146.3,201.68Z"
              />
              <path
                class="cls-2"
                d="M186.56,221.43c-13.8,0-28.83-3.65-44.26-13.48l-1.29-.83-.87-1.27a32.18,32.18,0,0,1-3.27-26.55c4.52-14,18.51-25.34,41.56-33.72,18.54-6.74,35.06-6.5,49.11.74,22.47,11.56,29.71,36.8,30,37.87l1.15,4.11-3,3.06C255.33,191.77,225.92,221.43,186.56,221.43Zm-34.69-25.05c20,12.16,41.45,13.52,63.72,4.06a103.11,103.11,0,0,0,26.12-16.38c-2.66-6.34-9.07-18.44-21.08-24.57-10.19-5.21-22.68-5.18-37.11.07-18.27,6.64-29.5,15.05-32.5,24.32A17.27,17.27,0,0,0,151.87,196.38Z"
              />
              <path
                class="cls-3"
                d="M436.75,77.36l-53-44.84S299.91-44.93,200.62,72.4l-60.85,71.91s-42.22,42.22-23.3,58.23,82.4-66.67,150.53-9,101.32-50.65,202.64-16.88c36.11,11.07,57.94-22.41,27.67-48Z"
              />
              <path
                class="cls-2"
                d="M307.47,218.29c-14,0-28.77-5.13-45.27-19.09-40.79-34.51-79.86-13.95-108.39,1.06-17.75,9.35-31.78,16.73-42.14,8a21,21,0,0,1-7.49-15.6c-.89-21.25,26-49.21,30.1-53.34L194.94,67.6c35.8-42.3,73.85-65,113.12-67.38,47.89-3,79.42,25.62,80.75,26.84l113.3,95.87c16,13.53,21.21,31.64,13.3,46.13-6.85,12.53-24.34,21.94-47.95,14.69-46.94-15.64-77.25.47-106.57,16C343.2,209.19,326.08,218.29,307.47,218.29Zm-92.86-53c18.07,0,37.43,5.87,57.19,22.6,30.82,26.07,52.33,14.64,82.11-1.19C383,171.21,419.17,152,472,169.59c15.43,4.73,26.4-.43,30.35-7.66,4.45-8.15.67-18.74-9.85-27.65L379,38.2c-.52-.46-28.68-25.74-70.23-23.12-35,2.24-69.44,23.14-102.43,62.12l-72.83,86.07-.23-.19C125.58,173,118.72,184.48,119,192a6.15,6.15,0,0,0,2.23,4.86c2.72,2.28,16.49-5,25.61-9.77C164.91,177.61,188.4,165.25,214.61,165.25Z"
              />
              <circle class="cls-2" cx="421" cy="134.08" r="7.44" />
              <circle class="cls-2" cx="460.41" cy="129.55" r="7.44" />
              <path
                class="cls-2"
                d="M369.2,76.35a7.4,7.4,0,0,1-4.8-1.76c-58.49-49.49-106.76-3-108.79-1A7.44,7.44,0,0,1,245.16,63c.59-.59,60.1-57.92,128.84.25a7.43,7.43,0,0,1-4.8,13.11Z"
              />
              <path
                class="cls-3"
                d="M313.83,111.79S209.88,104,168,78.87,80.72,98.11,307.17,165.93"
              />
              <path
                class="cls-2"
                d="M307.17,173.37a7.54,7.54,0,0,1-2.13-.32C195.32,140.2,130.22,106.9,126.43,81.7a13.81,13.81,0,0,1,6.12-14c8.71-5.82,24.86-3.83,39.29,4.83,39.89,24,141.52,31.8,142.54,31.88a7.44,7.44,0,0,1-1.11,14.83c-4.32-.32-106.2-8.21-149.09-34-11.16-6.69-20.35-6.67-22.93-5.47,1.39,4,17,33.78,168.05,79a7.44,7.44,0,0,1-2.13,14.57Z"
              />
              <line
                class="cls-3"
                x1="314.84"
                y1="246.77"
                x2="379.3"
                y2="246.77"
              />
              <path
                class="cls-2"
                d="M379.3,254.21H314.85a7.44,7.44,0,1,1,0-14.87H379.3a7.44,7.44,0,1,1,0,14.87Z"
              />
              <line
                class="cls-3"
                x1="433.84"
                y1="246.77"
                x2="547.88"
                y2="246.77"
              />
              <path
                class="cls-2"
                d="M547.88,254.21h-114a7.44,7.44,0,1,1,0-14.87h114a7.44,7.44,0,1,1,0,14.87Z"
              />
              <line
                class="cls-3"
                x1="404.09"
                y1="246.77"
                x2="409.05"
                y2="246.77"
              />
              <path
                class="cls-2"
                d="M409.05,254.21h-5a7.44,7.44,0,0,1,0-14.87h5a7.44,7.44,0,1,1,0,14.87Z"
              />
              <line
                class="cls-3"
                x1="146.27"
                y1="246.77"
                x2="166.1"
                y2="246.77"
              />
              <path
                class="cls-2"
                d="M166.1,254.21H146.27a7.44,7.44,0,1,1,0-14.87H166.1a7.44,7.44,0,1,1,0,14.87Z"
              />
              <line
                class="cls-3"
                x1="195.85"
                y1="246.77"
                x2="290.05"
                y2="246.77"
              />
              <path
                class="cls-2"
                d="M290.05,254.21h-94.2a7.44,7.44,0,1,1,0-14.87h94.2a7.44,7.44,0,1,1,0,14.87Z"
              />
              <line
                class="cls-3"
                x1="270.22"
                y1="276.52"
                x2="463.59"
                y2="276.52"
              />
              <path
                class="cls-2"
                d="M463.59,284H270.22a7.44,7.44,0,0,1,0-14.88H463.59a7.44,7.44,0,0,1,0,14.88Z"
              />
              <line
                class="cls-3"
                x1="156.18"
                y1="276.52"
                x2="200.81"
                y2="276.52"
              />
              <path
                class="cls-2"
                d="M200.81,284H156.18a7.44,7.44,0,0,1,0-14.88h44.63a7.44,7.44,0,0,1,0,14.88Z"
              />
              <line class="cls-3" x1="7.44" y1="276.52" x2="131.39" y2="276.52" />
              <path
                class="cls-2"
                d="M131.39,284H7.44a7.44,7.44,0,0,1,0-14.88h124a7.44,7.44,0,1,1,0,14.88Z"
              />
              <line
                class="cls-3"
                x1="488.38"
                y1="276.52"
                x2="612.34"
                y2="276.52"
              />
              <path
                class="cls-2"
                d="M612.34,284h-124a7.44,7.44,0,0,1,0-14.88h124a7.44,7.44,0,0,1,0,14.88Z"
              />
              <line
                class="cls-3"
                x1="225.6"
                y1="276.52"
                x2="245.43"
                y2="276.52"
              />
              <path
                class="cls-2"
                d="M245.43,284H225.6a7.44,7.44,0,0,1,0-14.88h19.83a7.44,7.44,0,0,1,0,14.88Z"
              />
              <line
                class="cls-3"
                x1="71.89"
                y1="246.77"
                x2="116.52"
                y2="246.77"
              />
              <path
                class="cls-2"
                d="M116.52,254.21H71.89a7.44,7.44,0,0,1,0-14.87h44.63a7.44,7.44,0,0,1,0,14.87Z"
              />
            </g>
          </g>
        </svg>
        <p>Requested resource: ${resource} does not exist.</p>
      </div>
    </body>
  </html>
  

`
