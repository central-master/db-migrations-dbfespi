require('dotenv/config');

const shellComand =  require('./utils/shellComand');

exports.migrations = async (req, res) => {

  //valida method http
  if (req.method !== 'POST') {
    return res.status(400).json({ error: `invalid method: ${req.method}` });
  }
  
  //valida parâmetros de consulta da requisição 
  const [, method, others] = req.params["0"].split('/')
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
