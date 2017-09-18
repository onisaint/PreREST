# PreREST
### Front end development helper
AN effortless MOCK API. :-)
For front-end development an exact representation
of the data from the server helps minimize the
development cycle. For this to happen a server has to
be setup first, well that requires time. In this project a
JSON representation of the data is stored in a file which
is editable and is parsed and served by localhost.
Enabling BE and FE development in parallel.


first 
```git clone https://github.com/madhudskumar/PreREST.git ```

then
`gulp serve [-s|-m] source [-p port-number] | [-h] | [-v]`

### Multiple 
for multiple paths create a source file with
```
    {
      "root":<sourceDirectory>,
      "multiple":[
        {"src":<filename1>, "path":<urlPath1>},
        {"src":<filename2>, "path":<urlPath2>}
      ]
    }
```
for multiple paths do not give 'path' as '/' as it will be used for listing the available paths

licence : GPL - 3.0
