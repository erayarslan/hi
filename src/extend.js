String.prototype.levenshtein = function (stringTo, costOfInsertion, costOfReplacement, costOfDeletion) {
  var stringFrom = this;

  if (!stringTo) stringTo = "";
  if (!costOfInsertion) costOfInsertion = 1;
  if (!costOfReplacement) costOfReplacement = 1;
  if (!costOfDeletion) costOfDeletion = 1;

  if (stringFrom === stringTo) return 0;

  var lengthStringA = stringFrom.length;
  var lengthStringB = stringTo.length;

  if (lengthStringA === 0) {
    return lengthStringB * costOfInsertion;
  }

  if (lengthStringB === 0) {
    return lengthStringA * costOfDeletion;
  }

  var p1 = new Array(lengthStringB + 1);
  var p2 = new Array(lengthStringB + 1);

  var iA, iB, cRep, cDel, cIns, reversal;

  for (iB = 0; iB <= lengthStringB; iB++) {
    p1[iB] = iB * costOfInsertion;
  }

  for (iA = 0; iA < lengthStringA; iA++) {
    p2[0] = p1[0] + costOfDeletion;

    for (iB = 0; iB < lengthStringB; iB++) {
      cRep = p1[iB] + ((stringFrom[iA] === stringTo[iB]) ? 0 : costOfReplacement);
      cDel = p1[iB + 1] + costOfDeletion;

      if (cDel < cRep) cRep = cDel;
      cIns = p2[iB] + costOfInsertion;

      if (cIns < cRep) cRep = cIns;
      p2[iB + 1] = cRep;
    }

    reversal = p1;
    p1 = p2;
    p2 = reversal;
  }

  cRep = p1[lengthStringB];

  return cRep;
};

String.prototype.toLowerCaseTurkish = function () {
  var from = ["Ğ", "Ü", "Ş", "İ", "I", "Ö", "Ç"];
  var to = ["ğ", "ü", "ş", "i", "ı", "ö", "ç"];
  var str = this.split("");
  for (var i = 0; i < str.length; i++) {
    var c = from.indexOf(str[i]);
    if (c >= 0) str[i] = to[c];
  }
  return str.join("").toLowerCase();
};

String.prototype.toUpperCaseTurkish = function () {
  var from = ["ğ", "ü", "ş", "i", "ı", "ö", "ç"];
  var to = ["Ğ", "Ü", "Ş", "İ", "I", "Ö", "Ç"];
  var str = this.split("");
  for (var i = 0; i < str.length; i++) {
    var c = from.indexOf(str[i]);
    if (c >= 0) str[i] = to[c];
  }
  return str.join("").toUpperCase();
};

String.prototype.toEnglish = function () {
  var from = ["ğ", "ü", "ş", "ı", "ö", "ç", "Ğ", "Ü", "Ş", "İ", "I", "Ö", "Ç"];
  var to = ["g", "u", "s", "i", "o", "c", "G", "U", "S", "I", "I", "O", "C"];
  var str = this.split("");
  for (var i = 0; i < str.length; i++) {
    var c = from.indexOf(str[i]);
    if (c >= 0) str[i] = to[c];
  }
  return str.join("");
};

String.prototype.soundEx = function () {
  var str = this;
  var sdx = [0, 0, 0, 0];
  var m = {
    B: 1,
    F: 1,
    P: 1,
    V: 1,
    C: 2,
    G: 2,
    J: 2,
    K: 2,
    Q: 2,
    S: 2,
    X: 2,
    Z: 2,
    D: 3,
    T: 3,
    L: 4,
    M: 5,
    N: 5,
    R: 6
  };
  var i = 0;
  var j, s = 0;
  var c, p;

  while ((c = str.charAt(i++)) && s < 4) {
    if (j = m[c]) {
      if (j !== p) {
        sdx[s++] = p = j
      }
    } else {
      s += i === 1;
      p = 0
    }
  }

  sdx[0] = str.charAt(0);
  return sdx.join('');
};

Array.prototype.sortByKey = function (key, desc) {
  if (!desc) desc = false;
  return this.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    if (desc)
      return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * -1;
    else
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};


String.prototype.similar = function (texts) {
  var data = [];

  for (var m = 0; m < texts.length; m++) {
    data.push({original: texts[m], clean: texts[m].toEnglish(), soundEx: texts[m].toEnglish().toUpperCase().soundEx()});
  }

  var input = this;
  var bestScore = -1;
  var bestObj = {};
  var calculated = [];

  for (var i = 0; i < data.length; i++) {
    var obj = data[i];
    var lo = input.levenshtein(obj.original, 1, 2, 1);
    var lc = input.toEnglish().levenshtein(obj.clean, 1, 2, 1);
    var ls = lo === 0 || lc === 0 ? 0 : input.toEnglish().toUpperCase().soundEx().levenshtein(obj.soundEx, 1, 2, 1);

    obj.ans = [lo, lc, ls];
    obj.calc = Math.floor(ls + lc / 2.0 + lo);

    if (obj.calc <= bestScore || bestScore < 0) {
      bestScore = obj.calc;
      bestObj = obj;
    }

    calculated.push({o: obj.original, lo: lo, lc: lc, ls: ls, c: obj.calc});
  }

  calculated.sortByKey("c");

  var anothers = [];

  for (var j = 0; j < calculated.length; j++) {
    var c = calculated[j];
    anothers.push({original: c.o, score: c.c, levenshtein: c.lo, english: c.lc, soundEx: c.ls});
  }

  return {result: bestObj.original, score: bestScore, anothers: anothers};
};

String.prototype.pass = function () {
  function safeRegexEscape(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  var current = this;

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    current = current.replace(new RegExp(safeRegexEscape("%%")), arg);
  }

  return current;
};