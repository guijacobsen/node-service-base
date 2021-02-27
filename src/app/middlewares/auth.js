import jwt from "jsonwebtoken";
import { promisify } from "util";
import { errorMessage } from "../utils/handleResponse";

import { generateToken } from "../controllers/auth";

const notAuthenticated = (res) => {
  // return res.status(401).json({ message: `Usuário não autenticado` });
  return res.json(errorMessage(401, `Usuário não autenticado`));
};

export const checkToken = async (req, res, next) => {
  try {
    const acessToken = req.headers["x-acess-token"];
    if (acessToken) {
      const [bearer, token] = acessToken.split(" ");

      if (!/Bearer/.test(bearer)) {
        return notAuthenticated(res);
      }

      if (!token) {
        return notAuthenticated(res);
      }

      const decoded = await promisify(jwt.verify)(
        token,
        process.env.SECRET_KEY
      );

      const user = await req.db.Pessoa.findOne({
        where: { id: decoded.id },
      });

      if (!user) {
        return notAuthenticated(res);
      }

      req.currentUser = user;
      return next();
    }
    return notAuthenticated(res);
  } catch (err) {
    const [bearer, refresh] = req.headers["x-refresh-token"].split(" ");

    if (!/Bearer/.test(bearer)) {
      return notAuthenticated(res);
    }

    if (refresh) {
      try {
        const { id } = jwt.decode(refresh);

        if (!id) {
          return notAuthenticated(res);
        }

        const user = await req.db.Pessoa.findOne({
          where: { id },
          attributes: { include: ["password"] },
          raw: true,
        });

        let refreshToken = refresh;

        if (user) {
          const refreshSecret = process.env.REFRESH_SECRET_KEY + user.password;

          jwt.verify(refreshToken, refreshSecret);

          const [token, refresh] = await generateToken(user);

          res.set(
            "Access-Control-Expose-Headers",
            "X-Acess-Token, X-Refresh-Token"
          );
          res.set("X-Acess-Token", `Bearer ${token}`);
          res.set("X-Refresh-Token", `Bearer ${refresh}`);

          req.currentUser = user;
          return next();
        }
      } catch (error) {
        return notAuthenticated(res);
      }
    }

    return notAuthenticated(res);
  }
};
