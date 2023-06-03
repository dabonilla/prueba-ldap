const ldap = require('ldapjs');


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
      /*
      const opts = {
        filter: '(|(cn=dabonilla3)(sn=gu3))',
        scope: 'sub',
        attributes: ['sn','cn']
      };
      client.search('cn=usuarios,dc=arqsoft,dc=unal,dc=edu,dc=co', opts, (err, res) => {
        if (err) {
          console.log("Error in search", err);
          
          return;
        }
        
        const entries = [];
  
        res.on('searchEntry', (entry) => {
          entries.push(entry.object);
        });
        res.on('error', (err) => {
          console.log("Search error", err);
          
        });
        
        console.log("entries", entries)

        res.on('end', (result) => {
          if (result.status === 0) {
            
          } else {
            const err = new Error(`Search failed with status ${result.status}`);
            console.log("Search failed", err);
            
          }
        });
      });
*/

      const entry = {
        objectClass: ['top', 'posixAccount', 'inetOrgPerson'],
        cn: 'daniel112',
        uid: 'daniel112',
        uidNumber: '1000',
        gidNumber: '1001',
        homeDirectory: '/home/' + 'daniel112',
        userPassword: '12345',
        sn: 'New',
        givenName: 'User'
      };

      client.add(`cn=daniel112,cn=usuarios,dc=arqsoft,dc=unal,dc=edu,dc=co`, entry, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log("nueva entrada")
        }
      });


    }
  })
}

function authenticateDN2(username, password) {
  var client = ldap.createClient({
    url: 'ldap://127.0.0.1:389'

  })
  client.bind(username, password, function (err) {
    if (err) {
      console.log("Error in conection2", err)
    }
    else {
      console.log("success2")

    }
  })
}

authenticateDN2('cn=daniel112,cn=usuarios,dc=arqsoft,dc=unal,dc=edu,dc=co', '123453')