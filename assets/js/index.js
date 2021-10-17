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
      let formatedTime = Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit',  }).format(elem['publish_timestamp']);
      let td7UnderClass1 = createNormalTdNode('div', ['td'], (elem['content_type'] === 'Movie') ? formatedTime : '-');

      // Programmable
      let td8UnderClass1 = createTDAndSwitcherNode('div', ['td']);


      // create 9 td tag and append to class-1 node --- end

      // TODO: create 9 td tag of class-2 and related nodes

      // TODO: create 9 td tag of class-3 and related nodes

      // TODO: let nodes and text can be chained.
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

      tableNode.appendChild(rowNode);
    })

  });
