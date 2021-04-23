const fs = require("fs");

const errorHandler = require("../utils/errorHandler.util");
const pagination = require("../utils/pagination.util");
const usersFilePath = "./users.json";

module.exports.getUsers = (req, res) => {
  try {
    const { userId, pageSize, pageNumber } = req.query;
    const { users } = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    if (userId) {
      const candidate = users.find((user) => user.id === +userId);

      if (!candidate) {
        return errorHandler(res, "Такого пользователя не существует.", 404);
      }

      return res.status(200).json({ data: candidate });
    }

    if (pageSize) {
      const pages = pagination(users, pageSize);

      return res
        .status(200)
        .json({ data: pages[pageNumber - 1], pagesCount: pages.length });
    }

    res.status(200).json({
      data: users,
    });
  } catch (e) {
    errorHandler(res);
  }
};

module.exports.createUser = (req, res) => {
  try {
    const { users } = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    const { data } = req.body;

    const newUsersArr = [
      ...users,
      {
        ...data,
        id: Date.now(),
      },
    ];

    fs.writeFileSync(usersFilePath, JSON.stringify({ users: newUsersArr }));

    res.status(201).json({ message: "Пользователь был успешно создан." });
  } catch (e) {
    errorHandler(res);
  }
};

module.exports.editUser = (req, res) => {
  try {
    const { users } = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    const { data } = req.body;

    const editingUserIdx = users.indexOf(
      users.find((user) => user.id === data.id)
    );

    const leftUsersPart = users.slice(0, editingUserIdx);
    const rightUsersPart = users.slice(editingUserIdx + 1);

    const newUsers = [...leftUsersPart, data, ...rightUsersPart];

    fs.writeFileSync(usersFilePath, JSON.stringify({ users: newUsers }));

    res.status(201).json({ message: "Пользователь был успешно изменён." });
  } catch (e) {
    errorHandler(res);
  }
};

module.exports.deleteUser = (req, res) => {
  try {
    const { users } = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    const { uid, userIds, pageSize, pageNumber } = req.query;
    const newUsersArr = userIds
      ? [...users.filter((user) => !userIds.find((uid) => +uid === user.id))]
      : [...users.filter((user) => user.id !== +uid)];

    fs.writeFileSync(usersFilePath, JSON.stringify({ users: newUsersArr }));

    const currentUsers = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    const pages = pagination(currentUsers.users, pageSize);

    return res
      .status(202)
      .json({ data: pages[pageNumber - 1], pagesCount: pages.length });
  } catch (e) {
    errorHandler(res);
  }
};
