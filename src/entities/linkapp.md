以下是几个业务链路图：

欠费查询：
graph LR
/emss-eaa-payelec-front/member/p1/f01 --> osg-scp0001
osg-scp0001 --> emss-eaa-payelec-front
emss-eaa-asset-front --> emss-pmc-oracle-data
emss-eaa-payelec-front --> emss-eaa-asset-front
emss-eaa-payelec-front --> emss-mia-eca-front
emss-eaa-payelec-front --> emss-pmc-oracle-data
emss-eaa-payelec-front --> emss-pmc-payelec-subdomain
emss-eaa-payelec-front --> emss-uia-brace-front
emss-mia-eca-front --> emss-mac-oracle-data

提交订单：
graph LR
/emss-eaa-payelec-front/member/p2/f01 --> osg-scp0001
emss-eaa-payelec-front --> emss-pfa-syncorder-front
emss-eaa-payelec-front --> emss-pmc-oracle-data
emss-eaa-payelec-front --> emss-pmc-payelec-subdomain
emss-eaa-payelec-front --> emss-uia-brace-front
emss-pfa-syncorder-front --> emss-odc-drds-data
emss-pfa-syncorder-front --> emss-odc-ordercud-subdomain
osg-scp0001 --> emss-eaa-payelec-front

请求结算：
graph LR
/emss-eaa-payelec-front/member/p3/f03 --> osg-scp0001
emss-eaa-asset-front --> emss-pmc-oracle-data
emss-eaa-asset-front --> emss-uia-brace-front
emss-eaa-payelec-front --> emss-eaa-asset-front
emss-eaa-payelec-front --> emss-pmc-oracle-data
emss-eaa-payelec-front --> emss-uia-brace-front
osg-scp0001 --> emss-eaa-payelec-front

支付结果通知：
graph LR
/emss-eaa-recharge-front/member/c7/f01 --> osg-scp0001
osg-scp0001 --> emss-eaa-recharge-front
emss-eaa-recharge-front --> emss-eaa-recharge-front
emss-eaa-recharge-front --> emss-pfa-syncorder-front
emss-eaa-recharge-front --> emss-pmc-oracle-data
emss-eaa-recharge-front --> emss-pmc-payelec-subdomain
emss-eaa-recharge-front --> emss-pmc-recharge-subdomain
emss-eaa-recharge-front --> emss-uia-brace-front
emss-odc-ordersync-subdomain --> emss-odc-drds-data
emss-pfa-syncorder-front --> emss-odc-drds-data
emss-pfa-syncorder-front --> emss-odc-ordersync-subdomain
emss-uia-brace-front --> emss-coc-drds-data

支付完成：
graph LR
/emss-eaa-individuation-front/member/c2/f01 --> osg-scp0001
emss-eaa-individuation-front --> emss-pfa-syncorder-front
emss-eaa-individuation-front --> emss-pmc-oracle-data
emss-eaa-individuation-front --> emss-pmc-payelec-subdomain
emss-odc-ordersync-subdomain --> emss-odc-drds-data
emss-pfa-syncorder-front --> emss-odc-drds-data
emss-pfa-syncorder-front --> emss-odc-ordersync-subdomain
osg-scp0001 --> emss-eaa-individuation-front