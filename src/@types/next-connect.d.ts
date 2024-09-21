declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { Middleware } from 'next-connect';
  
    interface NextConnectOptions {
      onError?: (err: Error, req: NextApiRequest, res: NextApiResponse) => void;
      onNoMatch?: (req: NextApiRequest, res: NextApiResponse) => void;
    }
  
    function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
      options?: NextConnectOptions
    ): {
      use: (...middleware: Middleware<Req, Res>[]) => void;
      post: (handler: (req: Req, res: Res) => void) => void;
      // Add other methods as needed
    };
  
    export default nextConnect;
  }
  