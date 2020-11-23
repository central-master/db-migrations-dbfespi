require('dotenv/config');

const shellComand =  require('./utils/shellComand');

exports.migrations = async (req, res) => {

  //valida method http
  if (req.method !== 'POST') {
    return res.status(400).json({ error: `invalid method: ${req.method}` });
  }
  
  //captura os parâmetros de consulta da requisição
  const params = req.params["0"].split('/');
  const method = process.env.NODE_ENV === 'production'? params[0] : params[1];
  const others = process.env.NODE_ENV === 'production'? params[1] : params[2];

  //valida parâmetros de consulta 
  if (!method) {
    return res.status(400).json({ error: 'query parameters is missing' });
  }
  if (!!others || !['run','revert'].includes(method)) {
    return res.status(400).json({ error: 'invalid query parameters' });
  }
  
  
  try {
    //executa as migrations
    const result = await shellComand.exec(`npm run typeorm migration:${method}`);
    return res.status(200).json({
      message: result.includes('No migrations are pending')?
          'No migrations are pending' : 'successfully completed'
    });
  
  } catch (error) {
    return res.status(400).json(
      { 
        error: 'an unexpected error occurred while executing the migrations',
        technical_details: error.message
      });
  }
}
