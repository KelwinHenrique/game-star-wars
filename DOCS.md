<a name="top"></a>
# Game Str Wars v1.0.5

Api of planets to star wars game.

 - [Planet](#Planet)
   - [Create new planet](#Create-new-planet)
   - [Delete a planet](#Delete-a-planet)
   - [Get a planet by id](#Get-a-planet-by-id)
   - [Get all planets](#Get-all-planets)
   - [Update a planet](#Update-a-planet)

___


# <a name='Planet'></a> Planet

## <a name='Create-new-planet'></a> Create new planet
[Back to top](#top)

```
POST /planets
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>Planet's name.</p> |
| ground | `String` | <p>Planet's ground.</p> |
| weather | `String` | <p>Planet's weather.</p> |

### Parameters examples
`json` - Request-Example:

```json
HOST/planets/:id
{
 "name": "Terra",
 "ground": "Poroso",
 "weather": "Hot"
}
```

### Success response example

#### Success response example - `Success-Response:`

```json
HTTP/1.1 201
{}
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": "Error to create planet",
 "error": "Bad Request"
}
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": [
   "name must be a string",
   "Name cannot be empty",
   "Weather cannot be empty",
   "ground must be a string",
   "Ground cannot be empty"
  ],
 "error": "Bad Request"
}
```

## <a name='Delete-a-planet'></a> Delete a planet
[Back to top](#top)

```
DELETE /planets/:id
```

### Parameters examples
`json` - Request-Example:

```json
HOST/planets/:id
```

### Success response example

#### Success response example - `Success-Response:`

```json
{
 "id": "planet_id"
}
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": "Error to delete planet",
 "error": "Bad Request"
}
```

## <a name='Get-a-planet-by-id'></a> Get a planet by id
[Back to top](#top)

```
GET /planets/:id
```

### Parameters examples
`json` - Request-Example:

```json
HOST/planets/:id
```

### Success response example

#### Success response example - `Success-Response:`

```json
{
 "name": "Terra",
 "ground": "Poroso",
 "weather": "Hot",
 "_id": "6008f85b149ae8c5461e6c05",
 "createdAt": "2021-01-21T03:43:23.157Z",
 "updatedAt": "2021-01-21T03:43:23.157Z",
 "__v": 0
}
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": "Error to find planet",
 "error": "Bad Request"
}
```

## <a name='Get-all-planets'></a> Get all planets
[Back to top](#top)

```
GET /planets
```

### Success response example

#### Success response example - `Success-Response:`

```json
{
 "count": 1,
 "planets": [
  {
   "name": "Terra",
   "ground": "Poroso",
   "weather": "Hot",
   "_id": "6008f85b149ae8c5461e6c05",
   "createdAt": "2021-01-21T03:43:23.157Z",
   "updatedAt": "2021-01-21T03:43:23.157Z",
   "__v": 0
  }
 ]
}
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": "Error to find planets",
 "error": "Bad Request"
}
```

## <a name='Update-a-planet'></a> Update a planet
[Back to top](#top)

```
PUT /planets/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>Planet's name.</p> |
| ground | `String` | <p>Planet's ground.</p> |
| weather | `String` | <p>Planet's weather.</p> |

### Parameters examples
`json` - Request-Example:

```json
HOST/planets/:id
{
 "name": "Terra",
 "ground": "Poroso",
 "weather": "Hot"
}
```

### Success response example

#### Success response example - `Success-Response:`

```json
{
 "id": "planet_id"
 "name": "Terra",
 "ground": "Poroso",
 "weather": "Hot"
}
```

### Error response example

#### Error response example - `Error-Response:`

```json
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": "Error to update planet",
 "error": "Bad Request"
}
HTTP/1.1 400 Not Found
{
 "statusCode": 400,
 "message": [
   "name must be a string",
   "Name cannot be empty",
   "Weather cannot be empty",
   "ground must be a string",
   "Ground cannot be empty"
  ],
 "error": "Bad Request"
}
```
