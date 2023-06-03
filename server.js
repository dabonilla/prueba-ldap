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
        filter: '(|(cn=dabonilla2)(sn=guy))',
        scope: 'base',
        attributes: ['sn','cn']
      };
      client.search('ou=users,dc=arqsoft,dc=unal,dc=edu,dc=co', opts, (err, res) => {
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
        cn: 'dabonilla3',
        sn: 'guy3',
        uid: 'nguy3',
        mail: 'nguy3@example.org',
        objectClass: 'inetOrgPerson'
      };
      client.add(`cn=dabonilla3,ou=users,dc=arqsoft,dc=unal,dc=edu,dc=co`, entry, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log("nueva entrada")
        }
      });
    }
  })
}

authenticateDN('cn=admin,dc=arqsoft,dc=unal,dc=edu,dc=co ', 'admin')