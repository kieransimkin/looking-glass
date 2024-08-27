
export default async function Browse(req, res) {
  let {unit} = req.query;
  res.redirect(303,"/api/getTokenFull?unit="+unit)
}
