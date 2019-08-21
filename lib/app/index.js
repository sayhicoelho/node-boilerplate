const path = require('path')
const glob = require('glob')
const { Router } = require('express')

const generatedRoutes = {}

const routes = glob.sync(path.join(__dirname, '**/*', '*Routes.js'))

for (let route of routes) {
  const fullRouteNamespace = route.split('app/')[1]
  const paths = fullRouteNamespace.split('/')
  const version = paths[0]
  const namespace = paths[1]
  const versionRouteName = version + 'Routes'
  const namespaceRouteName = namespace + 'Routes'

  if (!(versionRouteName in generatedRoutes)) {
    generatedRoutes[versionRouteName] = {}
  }

  if (!(namespaceRouteName in generatedRoutes[versionRouteName])) {
    generatedRoutes[versionRouteName][namespaceRouteName] = Router()
  }

  generatedRoutes[versionRouteName][namespaceRouteName].use(require(route))
}

module.exports = generatedRoutes
