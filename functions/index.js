'use strict'
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
exports.create_admin = functions.storage.object().onFinalize(file => {
  const claims = {}
  claims.admin = true
  return admin.auth().setCustomUserClaims('user-id-goes-here', claims)
})
