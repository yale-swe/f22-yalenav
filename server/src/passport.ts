import express from "express";
import passport from "passport";
import { Strategy } from "passport-cas";

type User = {
  netId: string;
};

passport.use(
  new Strategy(
    {
      version: "CAS2.0",
      ssoBaseURL: "https://secure.its.yale.edu/cas",
    },
    function (profile, done) {
      console.log("verify user: ", profile);
      done(null, {
        netId: profile.user,
      });
    }
  )
);

passport.serializeUser<User>(function (user: any, done) {
  done(null, user.netId);
});

passport.deserializeUser(function (netId, done) {
  done(null, {
    netId,
  });
});

const casLogin = function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  passport.authenticate("cas", function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new Error("CAS auth but no user"));
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      if (req.query.redirect) {
        
        let redirectURL = req.query.redirect as string;
       
          
        const netId = user.netId ? user.netId : null;
        console.log(netId);
        return res.redirect(`${redirectURL}?netId=${netId}`)

      }
      return res.redirect("/check");
    });
  })(req, res, next);
};

export default (app: express.Express) => {
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/check", (req, res) => {
    if (req.user) {
      res.json({ auth: true, user: req.user });
    } else {
      res.json({ auth: false });
    }
  });

  app.get("/cas", casLogin);

  app.get("/logout", (req, res, next) => {
    req.logOut(function(err){
      if (err) { return next(err); }
    });
    return res.json({ success: true });
  });
};