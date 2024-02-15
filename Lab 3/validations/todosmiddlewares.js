// ---------------- get by id-----------------

const getById = (req, res, next) => {
  const parsedID = parseInt(req.params.id);

  if (Number.isNaN(parsedID) || parsedID <= 0) {
    res.status(400).render('errors', { message: 'Invalid Id' });
    return;
  }
  next();
};

// ----------------add (post)--------------------
const add = (req, res, next) => {
  if (!req.body || typeof req.body.title !== 'string') {
    res.status(400).render('errors', { message: 'Invalid body request ' });
    return;
  }

  // Retrieve the title from req.body
  const { title } = req.body;

  if (title.trim() === '') {
    res.status(400).render('errors', { message: 'Invalid Title' });
    return;
  }
  next();
};

// ------------- edit (patch)-------------------
const edit = (req, res, next) => {
  // check if the id is valid and available
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).render('errors', { message: 'Invalid Id' });
    return;
  }
  if (!req.body || typeof req.body.title!=='string' || typeof req.body.status !== 'string') {
    res.status(400).render('errors', { message: 'Invalid body request ' });
    return;
  }
  const { title } = req.body;
  const { status } = req.body;
  if (title === '' || status === '') {
    res.status(400).render('errors', { message: 'Invalid Input' });
    return;
  }
  // specific status
  const validStatus = ['in-progress', 'done'];
  if (!validStatus.includes(status)) {
    res.status(400).render('errors', { message: 'Invalid Status' });
    return;
  }
  next();
}
// --------------- delete ----------------

const deleteById = (req, res, next) => {
  const parsedID = parseInt(req.params.id);

  if (Number.isNaN(parsedID) || parsedID <= 0) {
    res.status(400).render('errors', { message: 'Invalid Id' });
    return;
  }

  next();
};


module.exports = {
  getById,
  add,
  edit,
  deleteById
};
