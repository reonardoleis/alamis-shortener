import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const RedirectURL = () => {
  
  //const [ error, setError ] = useState('');
  const router = useRouter();
  const { hash } = router.query;
  if (hash !== undefined) {
    fetch(`./api/${hash}`, { method: 'GET' }).then(res => {
      res.json().then(json => {
        if (!json.error && res.status === 200) {
          window.location.href = json.url;
        } else {
          window.location.href = '/'
        }
      })
    });
  }

  return (
    <div>
      Redirecting...
    </div>
  )
}

export default RedirectURL;
