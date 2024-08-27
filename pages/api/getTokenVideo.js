
/**
 * @description Redirects the request to a new URL. It extracts the `unit` parameter
 * from the original request and appends it to the new URL, which is then sent back
 * to the client with a HTTP status code of 303 (See Other).
 *
 * @param {Request} req - Used to handle HTTP requests.
 *
 * @param {Response} res - Used to send responses back to the client.
 */
export default async function Browse(req, res) {
  let {unit} = req.query;
  res.redirect(303,"/api/getTokenFull?unit="+unit)
}
