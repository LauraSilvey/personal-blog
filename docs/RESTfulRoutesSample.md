| Name    | Path           | HTTP verb | Purpose                                | Mongoose Method         |
|---------|----------------|-----------|----------------------------------------|-------------------------|   
| Index   | /dogs          | GET       | List of all dogs                       | Dog.find()              |
| New     | /dogs/new      | GET       | Show new dog form                      | N/A                     |
| Create  | /new           | POST      | Create a new dog, then redirect        | Dog.create()            |
| Show    | /dogs/:id      | GET       | Show info for one specific dog         | Dog.findById()          |
| Edit    | /dogs/:id/edit | GET       | Show edit form for one dog             | Dog.findById()          |
| Update  | /dogs/:id      | PUT       | Update selected dog, then redirect     | Dog.findByIdAndUpdate() |
| Destroy | /dogs/:id      | DELETE    | Delete selected dog, then redirect     | Dog.findByIdAndRemove() |
