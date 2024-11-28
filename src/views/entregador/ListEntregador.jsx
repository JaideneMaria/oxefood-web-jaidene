import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListEntregador() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalVer, setOpenModalVer] = useState(false);
    const [idRemover, setIdRemover] = useState();

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }



    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                console.log('Entregador removido com sucesso.')

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data)
                    })
            })
            .catch((error) => {
                console.log('Erro ao remover um entregador.')
            })
        setOpenModal(false)
    }


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }


    return (
        <div>
            <MenuSistema tela={'entregador'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Entregador </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-entregador'
                        />

                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>RG</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    {/*<Table.HeaderCell>Fone Celular</Table.HeaderCell>
                              <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                              <Table.HeaderCell>Entregas Realizadas</Table.HeaderCell>
                              <Table.HeaderCell>Valor Frete</Table.HeaderCell>
                              <Table.HeaderCell>Endereço: Rua</Table.HeaderCell>
                              <Table.HeaderCell>Endereço: Complemento</Table.HeaderCell>
                              <Table.HeaderCell>Endereço: Numero</Table.HeaderCell>
                              <Table.HeaderCell>Endereço: Bairro</Table.HeaderCell>
                              <Table.HeaderCell>Endereço: Cidade</Table.HeaderCell>
                              <Table.HeaderCell>Endereço: CEP</Table.HeaderCell> 
                              <Table.HeaderCell>Endereço: UF</Table.HeaderCell>
                              <Table.HeaderCell>Ativo</Table.HeaderCell> */}
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(entregador => (

                                    <Table.Row key={entregador.id}>
                                        <Table.Cell>{entregador.nome}</Table.Cell>
                                        <Table.Cell>{entregador.cpf}</Table.Cell>
                                        <Table.Cell>{entregador.rg}</Table.Cell>
                                        <Table.Cell>{entregador.dataNascimento}</Table.Cell>
                                        {/*<Table.Cell>{entregador.foneCelular}</Table.Cell>
                                  <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                  <Table.Cell>{entregador.qtdEntregasRealizadas}</Table.Cell>
                                  <Table.Cell>{entregador.valorFrete}</Table.Cell>
                                  <Table.Cell>{entregador.enderecoRua}</Table.Cell>
                                  <Table.Cell>{entregador.enderecoComplemento}</Table.Cell>
                                  <Table.Cell>{entregador.enderecoNumero}</Table.Cell>
                                  <Table.Cell>{entregador.enderecoBairro}</Table.Cell>
                                  <Table.Cell>{entregador.enderecoCidade}</Table.Cell>
                                  <Table.Cell>{entregador.enderecoCep}</Table.Cell>                 
                                  <Table.Cell>{entregador.enderecoUf}</Table.Cell>
                                  <Table.Cell>{entregador.ativo}</Table.Cell> 
                                 */}
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste entregador'
                                                icon>
                                                <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;

                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este entregador'
                                                icon
                                                onClick={e => confirmaRemover(entregador.id)}>
                                                <Icon name='trash' />
                                            </Button>

                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para visualizar este entregador'
                                                icon
                                                onClick={e => setOpenModalVer(entregador)}>
                                                <Icon name='eye' />
                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>


            <Modal
                basic
                onClose={() => setOpenModalVer(false)}
                onOpen={() => setOpenModalVer(true)}
                open={openModalVer}
            >
                <Header icon>
                    
                    <div style={{ marginTop: '5%' }}> Exibindo as Informações do Entregador </div>
                </Header>
                <Modal.Content>
                    <Table color='orange' sortable celled>

                        <Table.Body>

                                <>
                                    <Table.Row>
                                        <Table.Cell width={4}><strong>Nome</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.nome}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><strong>CPF</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.cpf}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell><strong>rg</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.rg}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>dataNascimento</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.dataNascimento}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>foneCelular</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.foneCelular}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>foneFixo</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.foneFixo}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>qtdEntregasRealizadas</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.qtdEntregasRealizadas}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>valorFrete</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.valorFrete}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>enderecoRua</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.enderecoRua}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>enderecoComplemento</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.enderecoComplemento}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>enderecoNumero</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.enderecoNumero}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>enderecoBairro</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.enderecoBairro}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>enderecoCidade</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.enderecoCidade}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>enderecoCep</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.enderecoCep}</Table.Cell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.Cell><strong>enderecoUf</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.enderecoUf}</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>

                                        <Table.Cell><strong>ativo</strong></Table.Cell>
                                        <Table.Cell>{openModalVer.ativo ? "Sim" : "Não"}</Table.Cell>
                                    </Table.Row>
                                </>
                        </Table.Body>
                    </Table>

                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModalVer(false)}>
                        <Icon name='reply' /> Voltar
                    </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}