env

PORT=

------------

service api

path            method    authen    params   body
/auth/register  POST        0       none     { sCode, password, confirmPassword, firstname, email}
/auth/login     POST        0       none     { tCode or sCode, password} 
/auth/me        GET        t,s      none     -
/homework       POST        t       none     { question, startdate, duedate, isPublished, subjectId, teacherId}
/subject        GET         0       none     -     