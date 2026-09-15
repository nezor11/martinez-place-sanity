import {createClient, type Transaction} from '@sanity/client'

const client = createClient({
  projectId: '6zr8au58',
  dataset: 'production',
  // Write token from the environment; never commit one to this public repo.
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2022-03-07', // Usa una fecha reciente para asegurarte de que usas la última API.
  useCdn: false,
})

interface UserDocument {
  _id: string
}

async function deleteDocuments() {
  // Realiza una consulta para obtener los documentos a eliminar.
  const query = "*[_type == 'person']"
  const documents: UserDocument[] = await client.fetch(query)

  if (documents.length > 0) {
    // Crea una transacción para eliminar todos los documentos encontrados.
    const transaction = documents.reduce(
      (tx: Transaction, doc: UserDocument) => tx.delete(doc._id),
      client.transaction(),
    )

    // Ejecuta la transacción.
    transaction
      .commit()
      .then(() => {
        console.log(`Se han eliminado ${documents.length} documentos.`)
      })
      .catch((err: Error) => {
        console.error('Error al eliminar documentos:', err.message)
      })
  } else {
    console.log('No se encontraron documentos para eliminar.')
  }
}

// Ejecuta la función principal para eliminar documentos.
deleteDocuments().catch((error) => {
  console.error('Failed to delete documents:', error)
})
