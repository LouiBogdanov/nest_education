## Entitties

```
Table categories {
  id uuid [primary key, default: `uuidv4()`]
  name varchar(32) [unique, not null]
  description varchar(256) [null]
  isActive bool [default: true]

  create_at timestampz
  update_at timestampz
}

Table products {
  id uuid [primary key, default: `uuidv4()`]
  name varchar(32) [unique, not null]
  description varchar(256) [null]

  category_id uuid [not null, ref: > categories.id]

  create_at timestampz
  update_at timestampz
}
```
