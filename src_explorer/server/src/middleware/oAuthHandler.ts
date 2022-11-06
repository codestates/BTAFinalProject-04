const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
  clientID: "1020843338589764",
  clientSecret: "43f523275ade3457b172a81de030d8a1",
  callbackURL: "http://localhost:3200/api/oauth2/facebook/callback",
  state: true
},
function(accessToken: any, refreshToken: any, profile: any, cb: any) {
  console.log("profile:", profile);  
  //return done(err, profile);
  return cb(null, profile);
}
));

passport.serializeUser(function(user: any, done: any) {
console.log("user:", user);
done(null, user);
})

passport.deserializeUser(function(user: any, done: any) {
console.log("user:", user);
done(null, user);
})

// passport.use(new GoogleStrategy({
//     clientID: "519931642018-q9mnt3fms3t25l8efciqrqhm87dmu988.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:3200/api/oauth2/google/callback",
//     passReqToCallback: true
//   },
//   function(request: any, accessToken: any, refreshToken: any, profile: any, cb: any) {
//     console.log("profile:", profile);  
//     //return done(err, profile);
//     return cb(null, profile);
//   }
// ));

// passport.serializeUser(function(user: any, done: any) {
//   console.log("user:", user);
//   done(null, user);
// })

// passport.deserializeUser(function(user: any, done: any) {
//   console.log("user:", user);
//   done(null, user);
// })

// import passport from "passport";
// import { URLSearchParams } from "url";
// import axios from "axios";
// import { StatusCodes } from "http-status-codes";
// import { passportCreate } from "../config/passport";
// import ApiResponse from "../utility/apiResponse";
// // import { IMiddleware } from "src/interface/IMiddleware";
// // import { verifyKey } from "src/middleware/authHandler";
// // import OauthService from "src/service/oauth/oauthService";
// // import { Config } from "src/config/config";
// // import { logger } from "src/config/logger";
// import ApiError from "src/utility/apiError";
// import IMiddleware from "src/interface/IMiddleware";

// export const oAuth2: IMiddleware = (req, res, next) => {
//   const { provider } = req.params;
//   const strategy = passportCreate(provider);
//   passport.authenticate(strategy)(req, res, next);
// };

// export const oAuth2Redirect: IMiddleware = (req, res, next) => {
//   const { provider } = req.params;
//   const strategy = passportCreate(provider);
//   passport.authenticate(strategy, { assignProperty: "federatedUser" })(req, res, next);
// };

// export const oAuth2Auth: IMiddleware = async (req, res, next) => {
//   // @ts-ignore

//   const { accessToken, refreshToken, profile } = req.federatedUser;

//   const session: any = req.session;
//   try {
//     session.oauth2 = { accessToken, refreshToken, profile };
//     next();
//   } catch (error: any) {
//     error.status = StatusCodes.INTERNAL_SERVER_ERROR;
//     ApiResponse.error(res, error);
//   }

// };

// // export const oauthRefeshToken2: IMiddleware = async (req, res, next) => {
// //   const { authorization }: any = req.headers;
// //   try {
// //     const { provider, oauthIdx, userIdx }: any = verifyKey(res, authorization);
// //     const { accessToken, refreshToken } = await OauthService.getOauthToken({ oauthIdx });

// //     if (provider !== "google" && refreshToken === null) {
// //       throw new ApiError("[REFRESHTOKEN_EXPIRE]", StatusCodes.UNAUTHORIZED, "RefreshToken is expire");
// //     }
// //     if (oauthIdx) {
// //       const result = await refreshTokenProviderSelect(provider, oauthIdx, accessToken);

// //       if (!result) {
// //         await tokenReissuance(provider, oauthIdx, userIdx, refreshToken);
// //       }
// //     }
// //     next();
// //   } catch (error) {
// //     ApiError.regist(error);
// //     ApiResponse.error(res, error);
// //   }
// // };
// // const refreshTokenProviderSelect = async (provider: any, oauthIdx: any, accessToken: any) => {
// //   if (provider === "kakao" && (await kakaoValidationToken(accessToken))) {
// //     return true;
// //   }
// //   if (provider === "naver" && (await naverValidationToken(accessToken, oauthIdx))) {
// //     return true;
// //   }
// //   if (provider === "google") {
// //     return true;
// //   }

// //   return false;
// // };

// // const tokenReissuance: any = async (provider: any, oauthIdx: any, userIdx: any, refreshToken: any) => {
// //   try {
// //     let accessToken;
// //     if (provider === "kakao") {
// //       const data = await kakaoRefreshToken(oauthIdx, refreshToken);
// //       accessToken = data.access_token;
// //     }
// //     if (provider === "naver") {
// //       const data = await naverRefreshToken(oauthIdx, refreshToken);
// //       accessToken = data.access_token;
// //     }
// //     if (provider === "google") {
// //       return true;
// //     }

// //     const result = await OauthService.updateToken({ accessToken, refreshToken, oauthIdx });
// //     if (result.affectedRows === 0) {
// //       throw new ApiError("NO_CHANGE", StatusCodes.BAD_REQUEST, `No data changed 'oauthIdx'='${oauthIdx}'`);
// //     }
// //     return true;
// //   } catch (error) {
// //     logger.error(error);
// //   }
// // };

// // const kakaoValidationToken: any = async (accessToken: any) => {
// //   try {
// //     const URL = Config.kakaoAuth.tokenInfoURL;
// //     const headers = { Authorization: `Bearer ${accessToken}` };
// //     await axios.get(URL, { headers });

// //     return true;
// //   } catch (error: any) {
// //     return false;
// //   }
// // };

// // const naverValidationToken: any = async (accessToken: any, oauthIdx: any) => {
// //   try {
// //     const URL = Config.naverAuth.validationURL;
// //     const headers = { Authorization: `Bearer ${accessToken}` };
// //     await axios.get(URL, { headers });

// //     return true;
// //   } catch (error: any) {
// //     return false;
// //   }
// // };

// // const kakaoRefreshToken: any = async (oauthIdx: any, refreshToken: any) => {
// //   try {
// //     const URL = Config.kakaoAuth.tokenURL;
// //     const params = new URLSearchParams();
// //     params.append("grant_type", "refresh_token");
// //     params.append("client_id", Config.kakaoAuth.clientID as any);
// //     params.append("refresh_token", refreshToken);
// //     params.append("client_secret", Config.kakaoAuth.clientSecret as any);
// //     const headers = { "Content-Type": "application/x-www-form-urlencoded" };

// //     const { data }: any = await axios.post(URL, params, { headers });

// //     if (data.error) {
// //       logger.error(`[${data.error_code}] ${data.error_description} | oauthIdx : ${oauthIdx}`);
// //       return false;
// //     }

// //     return data;
// //   } catch (error: any) {
// //     logger.error(`kakaoRefreshToken: ${error}`);
// //     return false;
// //   }
// // };

// // const naverRefreshToken: any = async (oauthIdx: any, refreshToken: any) => {
// //   try {
// //     const URL = Config.naverAuth.tokenURL;

// //     const payload = {
// //       params: {
// //         grant_type: "refresh_token",
// //         client_id: `${Config.naverAuth.clientID}`,
// //         client_secret: `${Config.naverAuth.clientSecret}`,
// //         refresh_token: `${refreshToken}`
// //       }
// //     };
// //     const { data }: any = await axios.get(URL, payload);

// //     if (data.error) {
// //       logger.error(`[${data.error}] ${data.error_description} | oauthIdx : ${oauthIdx}`);
// //       return false;
// //     }
// //     return data;
// //   } catch (error: any) {
// //     logger.error(error);
// //     return false;
// //   }
// // };

// // export const logoutAouthToken: IMiddleware = async (req, res, next) => {
// //   const { authorization }: any = req.headers;
// //   try {
// //     const { provider, oauthIdx }: any = verifyKey(res, authorization);
// //     const { accessToken } = await OauthService.getOauthToken({ oauthIdx });
// //     const result = await logoutProviderSelect(provider);
// //     if (result && accessToken !== null) {
// //       // kakao만 백에서 작업 가능
// //       // accessToken, refreshToken remove
// //       const URL = Config.kakaoAuth.logoutURL;
// //       const headers = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/x-www-form-urlencoded" };
// //       await axios.post(URL, {}, { headers });

// //       // kakao & token remove 동시 [ 적용할려면 프론트 작업하면서 같이 작업하면서 봐야함 ]
// //       // const URL = Config.kakaoAuth.logoutAllURL;
// //       // const params = { client_id: Config.kakaoAuth.clientID, logout_redirect_uri: Config.kakaoAuth.logoutCallback };
// //       // const re = await axios.get(URL, { params });
// //     }

// //     next();
// //   } catch (error) {
// //     ApiError.regist(error);
// //     ApiResponse.error(res, error);
// //   }
// // };

// const logoutProviderSelect = async (provider: any) => {
//   if (provider === "kakao") {
//     return true;
//   }
//   // (provider === "naver") {
//   //    Front 측에서  http://nid.naver.com/nidlogin.logout  링크로 랜더링 하여 로그아웃 처리
//   // }
//   return false;
// };

// // export const sessionOutAouthToken: IMiddleware = async (req, res, next) => {
// // const { authorization }: any = req.headers;
// // try {
// // const { provider, oauthIdx }: any = verifyKey(res, authorization);
// // const { accessToken } = await OauthService.getOauthToken({ oauthIdx });
// // const result = await sessionOutProviderSelect(provider, accessToken, oauthIdx);
// // if (!result) {
// //   throw new ApiError(
// //     "OAUTH_UNSUCESSFUL",
// //     StatusCodes.BAD_REQUEST,
// //     `oAuth unsuccessful withdrawal 'oauthIdx'=${oauthIdx}'`
// //       );
// //     }
// //     next();
// //   } catch (error) {
// //     ApiError.regist(error);
// //     ApiResponse.error(res, error);
// //   }
// // };

// // const sessionOutProviderSelect = async (provider: any, accessToken: any, oauthIdx: any) => {
// //   try {
// //     if (provider === "kakao") {
// //       await kakaoSessionOut(accessToken);
// //     }
// //     if (provider === "naver") {
// //       await naverSessionOut(accessToken);
// //     }
// //     if (provider === "google") {
// //       // const data = await googleSessionOut(oauthIdx);
// //     }
// //     return true;
// //   } catch (error: any) {
// //     console.dir(error.response.data);
// //     return false;
// //   }
// // };

// // const kakaoSessionOut = async (accessToken: any) => {
// //   const URL = Config.kakaoAuth.unlinkURL;
// //   const headers = { Authorization: `Bearer ${accessToken}` };

// //   await axios.post(URL, {}, { headers });
// // };
// // const naverSessionOut = async (accessToken: any) => {
// //   const URL = Config.naverAuth.tokenURL;
// //   const payload = {
// //     params: {
// //       grant_type: "delete",
// //       client_id: `${Config.naverAuth.clientID}`,
// //       client_secret: `${Config.naverAuth.clientSecret}`,
// //       access_token: `${accessToken}`,
// //       service_provider: "NAVER"
// //     }
// //   };

// //   await axios.get(URL, payload);
// // };

// // const googleSessionOut = async (oauthIdx: any) => {
// //   // const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.GOOGLE_API_KEY}`;
// //   // const payload = {
// //   //   idToken: "109389024731113017699",
// //   //   deleteProvider: Config.server.host
// //   // };
// //   // console.log("hi");
// //   // const re = await axios.post(URL, payload, {});
// //   // console.log("bye");
// //   // console.log(" : ", re);
// // };
