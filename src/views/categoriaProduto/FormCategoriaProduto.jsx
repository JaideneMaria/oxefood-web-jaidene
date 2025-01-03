
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";

export default function FormCategoriaProduto() {

  const [descricao, setDescricao] = useState();

  const { state } = useLocation();
  const [idCategoriaProduto, setIdCategoriaProduto] = useState();


  useEffect(() => {
    if (state != null && state.id != null) {
      axios.get("http://localhost:8080/api/categoriaproduto/" + state.id)
        .then((response) => {
          setIdCategoriaProduto(response.data.id)
          setDescricao(response.data.descricao)
        })
    }
  }, [state])


  function salvar() {

    let categoriaProdutoRequest = {
      descricao: descricao
    }

    if (idCategoriaProduto != null) { //Alteração:
      axios.put("http://localhost:8080/api/categoriaproduto/" + idCategoriaProduto, categoriaProdutoRequest)
        .then((response) => { console.log('Categoria alterada com sucesso.') })
        .catch((error) => { console.log('Erro ao alterar a categoria.') })
    } else { //Cadastro:
      axios.post("http://localhost:8080/api/categoriaproduto", categoriaProdutoRequest)
        .then((response) => { console.log('Categoria cadastrado com sucesso.') })
        .catch((error) => { console.log('Erro ao incluir a categoria.') })
    }
  }


  return (

    <div>
      <MenuSistema tela={'categoria'} />

      <div style={{ marginTop: '3%' }}>

        <Container textAlign='justified' >

          {idCategoriaProduto === undefined &&
            <h2> <span style={{ color: 'darkgray' }}> CategoriaProduto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
          }
          {idCategoriaProduto != undefined &&
            <h2> <span style={{ color: 'darkgray' }}> CategoriaProduto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
          }


          <Divider />

          <div style={{ marginTop: '4%' }}>

            <Form>

              <Form.Input
                required
                fluid
                label='Descrição'
                maxLength="100"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
              />



            </Form>

            <div style={{ marginTop: '4%' }}>

              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition='left'
                color='orange'
              >
                <Icon name='reply' />
                <Link to={'/list-categoriaproduto'}>Voltar</Link>

              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition='left'
                color='blue'
                floated='right'
                onClick={() => salvar()}
              >
                <Icon name='save' />
                Salvar
              </Button>

            </div>

          </div>

        </Container>
      </div>
    </div>

  );

}
