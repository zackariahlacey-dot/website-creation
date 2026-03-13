export const vizuluxEmailWrapper = (content: string, previewText: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vizulux Transmission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff; -webkit-font-smoothing: antialiased;">
  <div style="display: none; max-height: 0px; overflow: hidden;">
    ${previewText}
  </div>
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border: 1px solid #1a1a1a; border-radius: 30px; overflow: hidden; background-color: #050505;">
          <!-- Prism Header -->
          <tr>
            <td style="padding: 0;">
              <div style="height: 2px; background: linear-gradient(to right, #8b5cf6, #f472b6, #06b6d4, #fbbf24);"></div>
            </td>
          </tr>
          
          <!-- Logo & Telemetry -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; color: #ffffff;">VIZULUX</h1>
                  </td>
                  <td align="right">
                    <span style="font-family: monospace; font-size: 8px; font-weight: bold; color: #333333; letter-spacing: 2px;">[ NODE_TRANSMISSION_v4.0 ]</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px; line-height: 1.6;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px; background-color: #080808; border-top: 1px solid #1a1a1a; text-align: center;">
              <p style="margin: 0; font-size: 10px; font-weight: bold; color: #555555; text-transform: uppercase; letter-spacing: 3px;">Direct Architect Access</p>
              <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold; color: #ffffff;">802-585-9179</p>
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #111;">
                <p style="margin: 0; font-size: 8px; color: #333333; text-transform: uppercase; letter-spacing: 2px;">© 2026 VIZULUX. Built for the Future.</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const emailButton = (text: string, url: string) => `
  <div style="margin-top: 30px;">
    <a href="${url}" style="background-color: #ffffff; color: #000000; padding: 18px 35px; border-radius: 12px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">
      ${text}
    </a>
  </div>
`;
