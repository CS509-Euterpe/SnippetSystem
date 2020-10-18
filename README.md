### Install:
get node here
https://nodejs.org/en/download/

### install angular cli

```
npm install -g @angular-cli
```
### Set Windows Execution policy
the `ng` utility will be restricted on user accounts on initial install.
```
set-executionpolicy unrestricted
```
### running the project

build the project
```
cd [repo]/snip-gui
ng build
```

run the client (defaults to localhost:4200)
```
ng serve
```

## adding an angular component

```
cd [repo]/snip-gui
ng generate compoent Components/$COMPONENT_NAME
```

