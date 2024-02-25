const sendResponse = (res, status, data) => {
    res.status(status).json(data);
};

const fetchUserIfExists = (users, username, email) => {
    return users.find((u) => u.username === username || u.email === email);
};

module.exports = {
    sendResponse,
    fetchUserIfExists
}
