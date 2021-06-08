import fs from 'fs';

export const getfile = (req, res) => {
  let id = req.params.id;
  fs.readFile(`${id}.json`, 'utf8', function (err, data) {
    if (err) {
      res.status(401).json({ message: err.message });
    } else {
      let obj = JSON.parse(data);
      res.status(200).json(obj.savedfiles);
    }
  });
};

export const setfile = (req, res) => {
  let id = req.params.id;
  let output = req.body;
  fs.writeFile(
    `${id}.json`,
    JSON.stringify({ savedfiles: output }),
    function (err) {
      if (err) return console.log(err);
    }
  );
  res.status(201).json(id);
};
