const queries = {};

//IMAGES
queries.getImages = `
SELECT *
FROM photos
WHERE userid=$1`

queries.addImage = `
INSERT INTO photos(url, userid, date, rating)
VALUES($1, $2, $3, 0)
RETURNING photoid`

queries.updateImage = `
UPDATE photos
SET rating=$2
WHERE photoid=$1`;

queries.deleteImage = `
  DELETE FROM photos
  WHERE photoid=$1`

//TAGS
queries.getAllImageTags = `
SELECT t.tagid, t.tag, pt.photoid
FROM phototags pt
JOIN tags t
ON t.tagid = pt.tagid
WHERE pt.userid=$1`

queries.getTags = `
SELECT *
  FROM tags
WHERE userid = $1 `

queries.addTag = `
INSERT INTO tags(tag, userid)
VALUES($1, $2)
RETURNING tagid `

queries.updateTag = `
INSERT INTO phototags(userid, photoid, tagid)
VALUES($1, $2, $3)
`

queries.deleteTag = `
DELETE FROM phototags
WHERE userid = $1 AND photoid = $2 AND tagid = $3 `

//USERS
queries.createUser = `
INSERT INTO users(userid, name, sessionid)
VALUES($1, $2, $3)
RETURNING name`

queries.loginUser = `
UPDATE users
SET sessionid = $1
WHERE userid = $2
RETURNING name`

queries.logoutUser = `
UPDATE users
SET sessionid = null
WHERE userid = $1
RETURNING name`

module.exports = queries;
