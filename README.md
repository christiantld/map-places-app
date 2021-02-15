<p align="center">
  <a href="" rel="noopener">
 <img width=150px height=150px src="https://github.com/christiantld/map-places-app/blob/master/src/assets/icons/logo.svg" alt="Project logo"></a>
</p>

<h3 align="center">SMWHR -  Encontre locais próximos a você</h3>

<div align="center">

</div>

---

<p align="center" name="about"> Aplicação frontend desenvolvida com objetivo de buscar por locais em um raio de distância próximos ao usuário. A aplicação conta com opção de cadastro, login, edição de perfil, listagem de locais próximos baseado na geolocalização, mapa, opção de favoritar locais, fazer avaliação desses locais e ver a avalição de outro usuários.
</p>

## 📝 Conteúdo

- [Sobre](#about)
- [Iniciando o Projeto](#getting_started)
- [Uso](#usage)
- [Ferramentas](#built_using)
- [Futuras Implemtações](#todos)
- [Autor](#authors)

## 🏁 Iniciando o Projeto <a name = "getting_started"></a>

### Pré-requisitos

* [Node Js](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/get-npm)
* [VUE CLI](https://cli.vuejs.org/guide/prototyping.html)

### Clonando o projeto

Pelo terminal do seu sistema operacional, acesse a pasta onde deseja clonar o projeto e rode o comando

```
git clone https://github.com/christiantld/map-places-app.git

# COM SSH

git clone git@github.com:christiantld/map-places-app.git

# GITHUB CLI

gh repo clone christiantld/map-places-app
```

Ao clonar o repositório, basta acessá-lo com o comando

```
cd map-places-app
```

Dentro da pasta do projeto, instale as dependências

```
npm install
```

### Configurando arquivos .env

Nessa etapa você deve cduplicar o arquivo `.env.example` e renomear para `.env`. Em seguida no campo `VUE_APP_PLACES_API_KEY` você deve inserir a sua chave de api disponibilizada pelo google. Mais informações sobre como obeter a chave [AQUI](https://developers.google.com/places/web-service/get-api-key)

exemplo:
```
NODE_ENV=development
VUE_APP_API_USERS_URL=https://reqres.in/api/
VUE_APP_PLACES_API_KEY=AbABcDJDJd98888hjImnGTF
```

### Iniciando a aplicação localmente
Pelo seu terminal, dentro do diretório criado para o projeto, rode o comando abaixo.
```
npm run serve
```
Agora o projeto pode ser acessado por padrão através da porta 8080
`http://localhost:8080/`

### Login na aplicação

Os dados da aplicação estão mockados, utilizando a API pública [REQRES](https://reqres.in/), para acessar utilize o usuário
```
 email: "eve.holt@reqres.in",
 password: "cityslicka"
```

### Criar um novo usuário

Devido aos dados mockados, a resposta de sucesso de criação do usuário está disponível apenas para as seguintes credenciais
```
  email: "eve.holt@reqres.in",
  password: "pistol"
```

### Edição do Usuário

Os dados de usuário também estão mocados na api REQRES. Por dentro da aplicação é possível fazer a edição dos dados, que ficaram salvos no local storage durante a sua navegação. Porém, ainda não há persistência das informações em um banco de dados.

### Busca por locais

Para buscar por locais próxims a você é preciso autorizar a a API de geolocalização do seu navegador. A aplicação utiliza da API "Places" disponibilizada pelo google para buscar locais proximos às coordenadas informadas. A Aplicação também conta com a API de Mapas do Google para mostrar as localizações próximas

## ⛏️ Ferramentas <a name = "built_using"></a>

- Vue 3 via Vue CLI
- Composition API
- Store
- Vue Router
- REQRES API
- Google Places API
- Google Maps API
- Tailwind
- PostCSS
- Eslint + Prettier
- Validators
- Toasts

## TODOS - Furturas implementações<a name = "todos"></a>

- Testes unitários e end to end
- Criação de um backend e banco de dados próprios para persistência
- Inserir marcação no mapa dos locais próximos
- Adicionar opção de favoritar locais e mostrar os locais favoritados
- Adicionar sistema de avaliação dos locais
- Adicionar cards com detalhes dos locais

## ✍️ Autor <a name = "authors"></a>

- [@christiantld](https://github.com/christiantld)
