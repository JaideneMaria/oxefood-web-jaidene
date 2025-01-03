
import React, { useEffect, useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon, FormTextArea} from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';


export default function FormVenda() {

    const [cliente, setCliente] = useState();
    const [produto, setProduto] = useState();
    const [statusVenda, setStatusVenda] = useState();
    const [dataVenda, setDataVenda] = useState();
    const [valorTotal, setValorTotal] = useState();
    const [observacao, setObservacao] = useState();
    const [retiradaEmLoja, setRetiradaEmLoja] = useState();



    const { state } = useLocation();
    const [idVenda, setIdVenda] = useState();


    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/venda/" + state.id)
                .then((response) => {
                    setIdVenda(response.data.id)
                    setCliente(response.data.cliente)
                    setProduto(response.data.produto)
                    setStatusVenda(response.data.statusVenda)
                    setDataVenda(formatarData(response.data.dataVenda))
                    setValorTotal(response.data.valorTotal)
                    setObservacao(response.data.observacao)
                    setRetiradaEmLoja(response.data.retiradaEmLoja)

                })
        }
    }, [state])


    function salvar() {

        let vendaRequest = {
            cliente: cliente,
            produto: produto,
            statusVenda: statusVenda,
            dataVenda: dataVenda,
            valorTotal: valorTotal,
            observacao: observacao,
            retiradaEmLoja: retiradaEmLoja

        }

        if (idVenda != null) { //Alteração:
            axios.put("http://localhost:8080/api/venda/" + idVenda, vendaRequest)
                .then((response) => { console.log('Venda alterada com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar a venda.') })
        } else { //Cadastro:
            axios.post("http://localhost:8080/api/venda", vendaRequest)
                .then((response) => { 
                    notifySuccess('Venda cadastrada com sucesso.')
 })
                .catch((error) => { 
                    if (error.response.data.errors != undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                     }
             } else {
                 notifyError(error.response.data.message)
             }
          })
        }
    }

    const countryOptions = [
        { key: 'pedidoCancelado', value: 'pedidoCancelado', text: 'Pedido Cancelado' },
        { key: 'aguardandoPagamento', value: 'aguardandoPagamento', text: 'Aguardando Pagamento' },
        { key: 'pago', value: 'pago', text: 'Pago' },
        { key: 'entregue', value: 'entregue', text: 'Entregue' }
    ];


    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }


    return (

        <div>
            <MenuSistema tela={'venda'} />

            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idVenda === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idVenda != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Venda &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Cliente'
                                    maxLength="100"
                                    value={cliente}
                                    onChange={e => setCliente(e.target.value)}
                                />


                            </Form.Group>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Produto'
                                    maxLength="100"
                                    value={produto}
                                    onChange={e => setProduto(e.target.value)}
                                />


                                <Form.Field>
                                    <label>Status venda</label>
                                    <Form.Select
                                        placeholder='Selecione'
                                        options={countryOptions}
                                        value={statusVenda}
                                        onChange={(e, { value }) => setStatusVenda(value)}

                                    />
                                </Form.Field>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Data da venda'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataVenda}
                                        onChange={e => setDataVenda(e.target.value)}
                                    />

                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Valor Total'
                                    width={6}
                                    value={valorTotal}
                                    onChange={e => setValorTotal(e.target.value)}>

                                </Form.Input>

                            </Form.Group>

                            <FormTextArea label='Observação' placeholder='Escreva aqui as observações' value={observacao}
                                onChange={e => setObservacao(e.target.value)} />


                            <Form.Field>
                                <label>Ativo</label>
                                <Form.Group inline>
                                    <Form.Radio
                                        label='Sim'
                                        name="radioGroup"
                                        value="sim"
                                        style={{ marginRight: '1em' }}
                                        checked={retiradaEmLoja}
                                        onChange={e => setRetiradaEmLoja(true)}
                                    />
                                    <Form.Radio
                                        label='Não'
                                        name="radioGroup"
                                        value="não"
                                        checked={!retiradaEmLoja}
                                        onChange={e => setRetiradaEmLoja(false)}
                                    />
                                </Form.Group>

                            </Form.Field>

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
                                <Link to={'/list-venda'}>Voltar</Link>

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
            </div >
            
        </div >

    );

}
