import React from 'react'
import { StyleSheet, View } from 'react-native'
import PdfViewer from '~/components/pdf-viewer'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  const pdfUrl =
    'https://res.cloudinary.com/dchmztiqg/image/upload/v1739724844/a214fef9-e5ed-4b11-983f-bed293bcd0a5.pdf?fbclid=IwY2xjawIe94ZleHRuA2FlbQIxMAABHUX-Ti3VKRwFkp-kr6fl8s05vIdhZ2scezoi3JWMglzExXjQ03OYSRrxwQ_aem_eTqC0Tx_pRAvKEpVbU5bQw'

  return (
    <SafeAreaView className="m-0 flex-1 p-0" edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="">
        <View className="min-h-screen-safe flex flex-col gap-y-6 bg-secondary p-6">
          <PdfViewer
            source={{ uri: pdfUrl }} // pass the PDF URL here
            style={styles.pdfViewer}
            noLoader={false} // show the loader while the PDF is loading
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdfViewer: {
    flex: 1,
  },
})

export default App
