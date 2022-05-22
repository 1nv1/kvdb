# kvdb

It's a very simple wrapper for **localStorage**. The goal is use as a key/value database organized by schemas.

# Example

It's a very simple example as a guide.

```js
let schema = 'test';
let kv = new kvdb(schema);
console.log(kv.id());
kv.set('foo', 10);
console.log(kv.get('foo'));
let tstj = { intro: 'Hello world' };
kv.set('meh', tstj);
console.log(kv.get('meh'));
console.log(kv.get('none', ':-('));
console.table(kv.keys());
kv.drop(schema);
```

# Methods

## Create schema

To create and key/value schema, just instantiate kvdb. If you don't pass a schema name the method will created a generic global
schema by default.

```js
let kv = new kvdb('test');
```

## Just created?

The schema was just created? Return **true** if was like that or false in any other case.

```js
let ret = <instance>.isNew();
```

## Increase numeric key

If you wanna increase a numeric value in a key just use **inc**. If the key doesn't exist at the schema it will create with the
zero value.

```js
<instance>.inc(<key>);
```

## Get value from key

You can get the the value from a key using **get**. The method returns automátically three types depends the content of the
key: string, number or json. The first parameter is the key and the second is an optional value to return if the key don't
exist.

```js
let value = <instance>.get(<key>, [<default value>]);
```

## Get keys list

You can get a key list using **keys**. The method returns an array with the key list.

```js
let keys = <instance>.keys();
```

## Set value from key

If you need set or create a key you can use the **set** method. The first parameter is a key and the second the value.

```js
<instance>.set(<key>, <value>);
```

## Delete key

If you need delete a key you can use **del** method.

```js
<instance>.del(<key>);
```

## Schema id

When it create the schema automatically an id is created also. You can get the id using the **id** method.

```js
let id = <instance>.id();
```

## Drop schema

Drop the entire schema. Be careful.

```js
<instance>.drop();
```

# ToDo

- [x] Get the list of keys associated with schema.
- [ ] Better way to drop schema (performance).
- [ ] Add a second key to use the same schema name multiple times.
- [ ] Import/Export data from schema in json format.
- [ ] Improve the recognition of data types.
