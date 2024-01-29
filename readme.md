env

PORT=

------------

service api

path            method    params   body
/auth/register  POST      none     { sCode, password, confirmPassword, firstname, email}
/auth/login     POST      none     { tCode or sCode, password}        