
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (com_clipperz_pm_Proxy == null) var com_clipperz_pm_Proxy = {};
com_clipperz_pm_Proxy._path = 'dwr';
com_clipperz_pm_Proxy.handshake = function(p0, callback) {
  dwr.engine._execute(com_clipperz_pm_Proxy._path, 'com_clipperz_pm_Proxy', 'handshake', p0, callback);
}
com_clipperz_pm_Proxy.knock = function(p0, callback) {
  dwr.engine._execute(com_clipperz_pm_Proxy._path, 'com_clipperz_pm_Proxy', 'knock', p0, callback);
}
/*
com_clipperz_pm_Proxy.registrationPrelude = function(p0, callback) {
  dwr.engine._execute(com_clipperz_pm_Proxy._path, 'com_clipperz_pm_Proxy', 'registrationPrelude', p0, callback);
}
*/
com_clipperz_pm_Proxy.registration = function(p0, callback) {
  dwr.engine._execute(com_clipperz_pm_Proxy._path, 'com_clipperz_pm_Proxy', 'registration', p0, callback);
}
com_clipperz_pm_Proxy.logout = function(p0, callback) {
  dwr.engine._execute(com_clipperz_pm_Proxy._path, 'com_clipperz_pm_Proxy', 'logout', p0, callback);
}
com_clipperz_pm_Proxy.message = function(p0, callback) {
  dwr.engine._execute(com_clipperz_pm_Proxy._path, 'com_clipperz_pm_Proxy', 'message', p0, callback);
}
