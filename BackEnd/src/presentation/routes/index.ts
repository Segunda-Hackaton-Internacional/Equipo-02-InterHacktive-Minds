
//router.use('/materia-prima', materiaPrimaRouter);


import { default as authRouter, default as router } from "./auth.router";
import materiaPrimaRouter from "./materiaPrima.router";
import processRouter from "./process.router";
import statsRouter from "./stats.router";
import userRouter from "./user.router";

export {
  authRouter, materiaPrimaRouter, processRouter, router, statsRouter, userRouter
};

