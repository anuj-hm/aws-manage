const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require("aws-sdk");
const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: "", // Your user pool id here
  ClientId: "", // Your client id here
};

const pool_region = "us-south-1";
const username = "";
const password = "";

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function RegisterUser() {
  var attributeList = [];
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: "Anuj",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "preferred_username",
      Value: username,
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "gender",
      Value: "male",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "address",
      Value: "CMB",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "picture",
      Value: "CMB",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "profile",
      Value: "CMB",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: username,
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "phone_number",
      Value: "+919986749850",
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "custom:scope",
      Value: "admin",
    })
  );

  userPool.signUp(username, password, attributeList, null, function (
    err,
    result
  ) {
    if (err) {
      console.log(err);
      return;
    }
    const cognitoUser = result.user;
    userMap[username] = cognitoUser;
    console.log(cognitoUser);
    console.log("user name is " + cognitoUser.getUsername());
  });
}

function verify() {
  var userData = {
    Username: username,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration("785983", true, (err, res) => {
    if (err) {
      console.log("err", err);
    }
    console.log("res", res);
  });
}

function Login() {
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: username,
    Password: password,
  });

  var userData = {
    Username: username,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log("access token + " + result.getAccessToken().getJwtToken());
      console.log("id token + " + result.getIdToken().getJwtToken());
      console.log("refresh token + " + result.getRefreshToken().getToken());
    },
    onFailure: function (err) {
      console.log(err);
    },
  });
}

// RegisterUser();
Login();
// verify();
