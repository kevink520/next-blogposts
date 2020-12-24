export default (req, res) => {
  if (!req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const {
    name,
    email,
    blogurl,
    feedurl,
    notes,
  } = req.body;

  const Airtable = require('airtable');
  const base = new Airtable({ apiKey: process.env.APIKEY }).base('app60jF3B311GSKBO');
  base('Table 1').create([{ fields: { name, email, blogurl, feedurl, notes } }], err => {
    if (err) {
      console.error(err)
      res.status(500).end();
      return;
    }
  });

  res.json({
    success: true,
  });
};

