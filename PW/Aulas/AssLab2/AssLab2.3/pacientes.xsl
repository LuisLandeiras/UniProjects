<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="/">
    <xsl:for-each select="hospital/paciente">
      <xsl:if test="ano >= 2005">
        <paciente>
          <xsl:attribute name="indentificacao">
            <xsl:value-of select="indentificacao"/>
            <br></br>
          </xsl:attribute>
          <xsl:attribute name="sexo">
            <xsl:value-of select="sexo"/>
            <br></br>
          </xsl:attribute>
          <xsl:element name="nome">
            <xsl:value-of select="nome"/>
            <br></br>
          </xsl:element>
          <xsl:element name="ano">
            <xsl:value-of select="ano "/>
            <br></br>
          </xsl:element>
          <xsl:element name="bi">
            <xsl:value-of select="bi"/>
            <br></br>
          </xsl:element>
          <xsl:element name="contribuinte">
            <xsl:value-of select="contribuinte"/>
            <br></br>
          </xsl:element>
          <xsl:element name="SistemaDeSaude">
            <xsl:value-of select="SistemaDeSaude"/>
            <br></br>
          </xsl:element>
          <xsl:element name="Doutor">
            <xsl:if test="sexo = 'M'"> Dr. Marcelo Pereira </xsl:if>
            <xsl:if test="sexo = 'F'"> Dra. Josefina Fontes </xsl:if>
          </xsl:element>
          <br></br>
        </paciente>
        <br></br>
      </xsl:if>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
