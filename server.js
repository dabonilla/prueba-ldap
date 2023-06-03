const ldap = require('ldapjs');
const username = 'dabonilla';
const password = '12345';
const otherAttributes = {
  cn: 'new guy',
  sn: 'guy',
  uid: 'nguy',
  mail: 'nguy@example.org',
  objectClass: 'inetOrgPerson',
};


function createLDAPEntry(username, password, otherAttributes, callback) {
  var client = ldap.createClient({
    url: 'ldaps://127.0.0.1:636'

  })
  const entry = {
    cn: username,
    userPassword: password,
    ...otherAttributes,
  };

  client.add(`cn=${username},ou=users,dc=arqsoft,dc=unal,dc=edu,dc=co`, entry, (err) => {
    if (err) {
      callback(err, false);
    } else {
      callback(null, true);
    }
  });
}

function authenticateDN(username, password) {
  var client = ldap.createClient({
    url: 'ldap://127.0.0.1:389'

  })
  client.bind(username, password, function (err) {
    if (err) {
      console.log("Error in conection", err)
    }
    else {
      console.log("success")
      
      const opts = {
        filter: '(&(cn=dabonilla2)(email=nguy@example.org))',
        scope: 'sub',
        attributes: ['sn','dn','cn']
      };
      client.search('o=users', opts, (err, res) => {
        if(err){
          console.log("error: ",err)
        }else{
          //console.log(res)
          /*res.on('error', (err) => {
            console.error('error: ' + err.message);
          });*/
          res.on('end', (result) => {
            console.log('status: ' + result.status);
          });
        }
      });

      /*
      const entry = {
        cn: 'dabonilla2',
        sn: 'guy',
        uid: 'nguy',
        mail: 'nguy@example.org',
        objectClass: 'inetOrgPerson'
      };
      client.add(`cn=dabonilla2,ou=users,dc=arqsoft,dc=unal,dc=edu,dc=co`, entry, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log("nueva entrada")
        }
      });*/
    }
  })
}





authenticateDN('cn=admin,dc=arqsoft,dc=unal,dc=edu,dc=co ', 'admin')




/*createLDAPEntry(username, password, (err, isSuccess) => {
  if (err) {
    console.error('Error al crear la entrada en LDAP:', err);
  } else {
    if (isSuccess) {
      console.log('Entrada creada en LDAP exitosamente');
      // Continuar con la lógica de tu aplicación
    } else {
      console.log('No se pudo crear la entrada en LDAP');
      // Manejar la falla de creación de entrada en LDAP
    }
  }
});*/