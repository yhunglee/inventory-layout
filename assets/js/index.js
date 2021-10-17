let createNormalTdNode = (tagName, listOfClassName, valAtText) => {

  let tdNode = document.createElement(tagName);
  tdNode.classList.add(...listOfClassName);
  
  let textNode = document.createTextNode(valAtText);
  tdNode.appendChild(textNode);

  return tdNode;
}

let createTDAndLabelForClass1Node = (tagName, listOfClassNameForTag, attrNameForLabel, valOfAttrNameForLabel) => {
  let tdNode = document.createElement(tagName);
  tdNode.classList.add(...listOfClassNameForTag);

  let labelNode = document.createElement('label');
  labelNode.setAttribute(attrNameForLabel, valOfAttrNameForLabel);

  tdNode.appendChild(labelNode);
  
  return tdNode;

}

let createTDAndLabelForClass2Node = (tagName, listOfClassNameForTag, attrNameForLabel, valOfAttrNameForLabel, valTextForTag) => {

  let tdNode = document.createElement(tagName);
  tdNode.classList.add(...listOfClassNameForTag);

  let labelNode = document.createElement('label');
  labelNode.setAttribute(attrNameForLabel, valOfAttrNameForLabel);

  tdNode.appendChild(labelNode);

  let textNode = document.createTextNode(valTextForTag);
  tdNode.appendChild(textNode);
  
  return tdNode;
}

let createTDAndSwitcherNode = (tagName, listOfClassNameForTag) => {
  let tdNode = document.createElement(tagName);
  tdNode.classList.add(...listOfClassNameForTag);

  let labelNode = document.createElement('label');
  labelNode.classList.add('switch');
  let inputNode = document.createElement('input');
  inputNode.setAttribute('type', 'checkbox');

  let spanNode = document.createElement('span');
  spanNode.classList.add('slider');

  labelNode.appendChild(inputNode);
  labelNode.appendChild(spanNode);
  tdNode.appendChild(labelNode);

  return tdNode;
}


fetch('assets/files/titles.json')
  .then(resp => resp.json())
  .then(json => {

    console.log(json); // debug

    let data = json;
    // TODO: load data to DOM
    let [tableNode,] = document.getElementsByClassName('table');
    // console.log(tableNode); // debug

    data.forEach((elem, idx) => {

      // recordContainer
      let rowNode = document.createElement('div');
      rowNode.classList.add(`record-container-${idx}`);

      // checkboxForClass1
      let checkboxForClass1 = '';
      if (elem['seasons'].length > 0) {

        // for class-1 with seasons
        checkboxForClass1 = document.createElement('input');
        checkboxForClass1.setAttribute('type', 'checkbox');
        checkboxForClass1.setAttribute('id', `movie-${idx}`);

      } else {
        // do nothing
      }

      // class-1
      let class1Node = document.createElement('div');
      class1Node.classList.add('class-1', 'tr');
      
      // creat 9 td tag and append to class-1 node --- start
      
      // arrow
      let td1UnderClass1 = createTDAndLabelForClass1Node('div', ['td'], 'for', `movie-${idx}`);

      // ID
      let td2UnderClass1 = createNormalTdNode('div', ['td'], elem['title_id']);
      

      // Title name
      let td3UnderClass1 = createNormalTdNode('div', ['td'], elem['title_name'])
      

      // Type
      let td4UnderClass1 = createNormalTdNode('div', ['td'], elem['content_type']);

      // Season
      let td5UnderClass1 = createNormalTdNode('div', ['td'], (elem['seasons'].length > 0) ? elem['seasons'].length: '-');

      // Episode
      let td6UnderClass1 = createNormalTdNode('div', ['td'], (elem['content_type'] !== 'Movie' && elem['episode_count'] > 1) ? elem['episode_count'] : '-');

      // Published
      let formatedTime = Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'  }).format(elem['publish_timestamp']);
      let td7UnderClass1 = createNormalTdNode('div', ['td'], (elem['content_type'] === 'Movie') ? formatedTime : '-');

      // Programmable
      let td8UnderClass1 = createTDAndSwitcherNode('div', ['td']);


      if (checkboxForClass1 != '') {
        rowNode.appendChild(checkboxForClass1
          );
      }

      class1Node.appendChild(td1UnderClass1);
      class1Node.appendChild(td2UnderClass1);
      class1Node.appendChild(td3UnderClass1);
      class1Node.appendChild(td4UnderClass1);
      class1Node.appendChild(td5UnderClass1);
      class1Node.appendChild(td6UnderClass1);
      class1Node.appendChild(td7UnderClass1);
      class1Node.appendChild(td8UnderClass1);

      

      rowNode.appendChild(class1Node);

      // create 9 td tag and append to class-1 node --- end

      // create 9 td tag of class-2 and related nodes --- start
      
      if (elem['seasons'].length > 0) {

        // for class-2 with episodes
        elem['seasons'].forEach((season, idxSeason) => {

          // checkboxForClass2
          let checkboxForClass2 = '';

          checkboxForClass2 = document.createElement('input');
          checkboxForClass2.setAttribute('type', 'checkbox');
          checkboxForClass2.setAttribute('id', `movie-${idx}-season-${idxSeason}`);

          // class-2
          let class2Node = document.createElement('div');
          class2Node.classList.add('class-2', 'tr');

          // empty column
          let td1UnderClass2 = createNormalTdNode('div', ['td'], '');

          // ID and arrow
          let td2UnderClass2 = createTDAndLabelForClass2Node('div', ['td'], 'for', `movie-${idx}-season-${idxSeason}`, season['season_id']);

          // Title name
          let td3UnderClass2 = createNormalTdNode('div', ['td'], season['season_name']);

          // Type
          let td4UnderClass2 = createNormalTdNode('div', ['td'], 'Season');

          // Season
          let td5UnderClass2 = createNormalTdNode('div', ['td'], `S${season['season_number']}`);

          // Episode
          let td6UnderClass2 = createNormalTdNode('div', ['td'], season['episode_count']);

          // Published
          let formatedTimeForSeason = Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(elem['publish_timestamp']);
          let td7UnderClass2 = createNormalTdNode('div', ['td'], formatedTimeForSeason);

          // Programmable and switch
          let td8UnderClass2 = createTDAndSwitcherNode('div', ['td']);


          // let nodes under class-2 be chained.

          if (checkboxForClass2 != '') {
            rowNode.appendChild(checkboxForClass2);
          }

          class2Node.appendChild(td1UnderClass2);
          class2Node.appendChild(td2UnderClass2);
          class2Node.appendChild(td3UnderClass2);
          class2Node.appendChild(td4UnderClass2);
          class2Node.appendChild(td5UnderClass2);
          class2Node.appendChild(td6UnderClass2);
          class2Node.appendChild(td7UnderClass2);
          class2Node.appendChild(td8UnderClass2);

          rowNode.appendChild(class2Node);

          

          // create 9 td tag of class-3 and related nodes --- start
          season['episodes'].forEach((episode) => {

            // class-3
            let class3Node = document.createElement('div');
            class3Node.classList.add('class-3', 'tr');

            // empty column
            let td1UnderClass3 = createNormalTdNode('div', ['td'], '');

            // ID
            let td2UnderClass3 = createNormalTdNode('div', ['td'], episode['episode_id']);
            
            // Title name
            let td3UnderClass3 = createNormalTdNode('div', ['td'], episode['episode_name']);

            // Type
            let td4UnderClass3 = createNormalTdNode('div', ['td'], 'Episode');

            // Season
            let td5UnderClass3 = createNormalTdNode('div', ['td'], `--`);

            // Episode
            let td6UnderClass3 = createNormalTdNode('div', ['td'], `EP${episode['episode_number']}`);

            // Published
            let td7UnderClass3 = createNormalTdNode('div', ['td'], `--`);

            // Programmable
            let td8UnderClass3 = createTDAndSwitcherNode('div', ['td']);

            // let nodes under class-3 be chained

            class3Node.appendChild(td1UnderClass3);
            class3Node.appendChild(td2UnderClass3);
            class3Node.appendChild(td3UnderClass3);
            class3Node.appendChild(td4UnderClass3);
            class3Node.appendChild(td5UnderClass3);
            class3Node.appendChild(td6UnderClass3);
            class3Node.appendChild(td7UnderClass3);
            class3Node.appendChild(td8UnderClass3);

            rowNode.appendChild(class3Node);
            
          }); 
          

          // create 9 td tag of class-3 and related nodes --- end

        });
        
      }

      // create 9 td tag of class-2 and related nodes --- end

      

      // let nodes and text can be chained.
      
      tableNode.appendChild(rowNode);
    })

  });
