import React, { useState } from 'react'
import Error from './Error'
import shortid from 'shortid'
import PropTypes from 'prop-types'

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {

    const [ nombregasto, guardarNombreGasto ] = useState("")
    const [ cantidad, guardarCantidad ] = useState(0)
    const [ error, guardarError ] = useState( false )


    const agregarGasto = e => {
        e.preventDefault()
        if( cantidad < 1 || isNaN( cantidad )  || nombregasto.trim() === ""){
            guardarError(true)
            return
        }
        guardarError( false )

        const gasto = {
            nombregasto,
            cantidad,
            id: shortid.generate()
        }
       
        guardarGasto( gasto )
        guardarCrearGasto( true )
        
        guardarNombreGasto( "" )
        guardarCantidad( 0 )

    }

    return (
        <div>
            <form
                onSubmit={ agregarGasto }
            >
                 <h2>Agrega tus gastos aqui</h2>
                 { error ? <Error mensaje="todos los campos son obligatorios o presupuesto incorrecto"/> : null }
                 <div className="campo">
                     <label>Nombre Gasto</label>
                     <input 
                           type="text"
                           className="u-full-width"
                           placeholder="Ej. Transporte"
                           value={ nombregasto }
                           onChange={e => guardarNombreGasto( e.target.value )}
                     />
                 </div>

                 <div className="campo">
                     <label>Cantidad Gasto</label>
                     <input 
                           type="number"
                           className="u-full-width"
                           placeholder="Ej. 300"
                           value={ cantidad }
                           onChange={ e => guardarCantidad( parseInt( e.target.value,10 ))}
                     />
                 </div>

                 <input 
                       type="submit"
                       className="button-primary u-full-width"
                       value="Agregar Gasto"
                 />

            </form>
        </div>
    )
}
Formulario.propTypes = {

    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario
