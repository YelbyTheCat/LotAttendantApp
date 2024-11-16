export const metaTypes = {
  INTEGER: 'INTEGER',
  INTEGER_PK_AI: 'INTEGER PRIMARY KEY AUTOINCREMENT',
  TEXT: 'TEXT',
  REAL: 'REAL',
  BOOLEAN: 'BOOLEAN'
};

export const convertMetaToString = meta => {
  const keys = Object.keys(meta);
  let metaString = [];
  // console.log('Keys', keys);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    // console.log(`Key: ${key} ${meta[key]}`);
    metaString.push(`${key} ${meta[key]}`);
  }
  return metaString.join(',');
};
