const index = (req, res) => {
    res.render('index', { title: 'Index' });
}

module.exports = {
    index
};