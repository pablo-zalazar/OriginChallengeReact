import { User } from "../models/User.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { checkPassword } from "../helpers/checkPassword.js";

export const signUp = async (req, res) => {
  const { username, password, password2 } = req.body;
  if (!username || !password || !password2) {
    const error = new Error("Faltan valores en el request body");
    return res.status(400).json({ msg: error.message });
  }

  if (username.length < 4) {
    const error = new Error("El usuario debe tener al menos 4 caracteres");
    return res.status(400).json({ msg: error.message });
  }

  if (password.length < 8 || password2.length < 8) {
    const error = new Error("El password debe tener al menos 8 caracteres");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const existsUser = await User.findOne({ where: { username } });
    if (existsUser) {
      const error = new Error("Ya existe el usuario");
      return res.status(400).json({ msg: error.message });
    }

    if (password !== password2) {
      const error = new Error("Los passwords son diferentes");
      return res.status(400).json({ msg: error.message });
    }

    const newPassword = await hashPassword(password);
    await User.create({
      username,
      password: newPassword,
    });
    return res.status(201).json({ msg: "Usuario creado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    const error = new Error("Faltan valores en el request body");
    return res.status(400).json({ msg: error.message });
  }
  if (username.length < 4) {
    const error = new Error("El usuario debe tener al menos 4 caracteres");
    return res.status(400).json({ msg: error.message });
  }
  if (password.length < 8) {
    const error = new Error("El password debe tener al menos 8 caracteres");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = await User.findOne({ where: { username } }, {});
    if (!user || !(await checkPassword(password, user.password))) {
      const error = new Error("El usuario o el password es incorrecto");
      return res.status(404).json({ msg: error.message });
    }
    const response = {
      id: user.id,
      username: user.username,
      favActions: user.favActions,
    };
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const addAction = async (req, res) => {
  const { id, action } = req.body;
  if (!id || !action) {
    const error = new Error("Faltan valores en el request body");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const user = await User.findByPk(id, { attributes: ["id", "username", "favActions"] });
    if (!user) {
      const error = new Error("No existe el usuario");
      return res.status(404).json({ msg: error.message });
    }
    if (!user.dataValues.favActions.includes(action)) user.favActions = [...user.favActions, action];
    await user.save();
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const removeAction = async (req, res) => {
  const { id, action } = req.body;
  if (!id || !action) {
    const error = new Error("Faltan valores en el request body");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const user = await User.findByPk(id, { attributes: ["id", "username", "favActions"] });
    if (!user) {
      const error = new Error("No existe el usuario");
      return res.status(404).json({ msg: error.message });
    }
    user.favActions = user.favActions.filter((act) => act !== action);
    await user.save();
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
