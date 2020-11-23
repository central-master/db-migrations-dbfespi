require('dotenv/config');

const shellComand =  require('./utils/shellComand');

exports.runMigrations = async (req, res) => {

  if (req.method !== 'POST') {
    return res.status(400).json({ error: `invalid method: ${req.method}` })
  }

  try {
    const result = await shellComand.exec('npm run typeorm migration:run');
    return res.status(200).json({
      message: result.includes('No migrations are pending')?
          'No migrations are pending' : 'Successfully completed'
    });
  
  } catch (error) {
    return res.status(400).json(
      { 
        error: 'an unexpected error occurred while executing the migrations',
        technical_details: error.message
      });
  }
}
