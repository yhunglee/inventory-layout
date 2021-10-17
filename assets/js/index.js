fetch('assets/files/titles.json')
  .then(resp => resp.json())
  .then(json => {

    // console.log(`json: ${JSON.stringify(json)}`); // debug 
    console.log(json); // debug



  });
