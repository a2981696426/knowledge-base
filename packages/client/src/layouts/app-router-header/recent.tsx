import { IconChevronDown } from '@douyinfe/semi-icons';
import { Dropdown, Modal, Space, TabPane, Tabs, Typography } from '@douyinfe/semi-ui';
import { DataRender } from 'components/data-render';
import { DocumentStar } from 'components/document/star';
import { Empty } from 'components/empty';
import { IconDocumentFill } from 'components/icons/IconDocumentFill';
import { LocaleTime } from 'components/locale-time';
import { useRecentDocuments } from 'data/document';
import { useToggle } from 'hooks/use-toggle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

import styles from './index.module.scss';
import { Placeholder } from './placeholder';

const { Text } = Typography;

export const RecentDocs = ({ visible }) => {
  const { query } = useRouter();
  const { data: recentDocs, loading, error, refresh } = useRecentDocuments(query.organizationId);

  const renderNormalContent = useCallback(() => {
    return (
      <div className={styles.itemsWrap} style={{ margin: '0 -16px' }}>
        {recentDocs && recentDocs.length ? (
          recentDocs.map((doc) => {
            return (
              <div className={styles.itemWrap} key={doc.id}>
                <Link
                  href={{
                    pathname: '/app/org/[organizationId]/wiki/[wikiId]/doc/[documentId]',
                    query: {
                      organizationId: doc.organizationId,
                      wikiId: doc.wikiId,
                      documentId: doc.id,
                    },
                  }}
                >
                  <a className={styles.item}>
                    <div className={styles.leftWrap}>
                      <IconDocumentFill style={{ marginRight: 12 }} />
                      <div>
                        <Text ellipsis={{ showTooltip: true }} style={{ width: 180 }}>
                          {doc.title}
                        </Text>

                        <Text size="small" type="tertiary">
                          ????????????
                          {doc.createUser && doc.createUser.name} ??? <LocaleTime date={doc.updatedAt} />
                        </Text>
                      </div>
                    </div>
                    <div className={styles.rightWrap}>
                      <DocumentStar organizationId={doc.organizationId} wikiId={doc.wikiId} documentId={doc.id} />
                    </div>
                  </a>
                </Link>
              </div>
            );
          })
        ) : (
          <Empty message="???????????????????????????????????????" />
        )}
      </div>
    );
  }, [recentDocs]);

  useEffect(() => {
    if (visible) {
      refresh();
    }
  }, [visible, refresh]);

  return (
    <Tabs type="line" size="small">
      <TabPane tab="??????" itemKey="docs">
        <DataRender
          loading={loading}
          loadingContent={<Placeholder />}
          error={error}
          normalContent={renderNormalContent}
        />
      </TabPane>
    </Tabs>
  );
};

export const RecentModal = ({ visible, toggleVisible }) => {
  return (
    <Modal
      centered
      title="????????????"
      visible={visible}
      footer={null}
      onCancel={toggleVisible}
      style={{ maxWidth: '96vw' }}
    >
      <div style={{ paddingBottom: 24 }}>
        <RecentDocs visible={visible} />
      </div>
    </Modal>
  );
};

export const RecentMobileTrigger = ({ toggleVisible }) => {
  return <span onClick={toggleVisible}>??????</span>;
};

const dropdownContainerStyle = { width: 300, padding: '16px 16px 0' };

export const Recent = () => {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <span>
      <Dropdown
        trigger="click"
        spacing={16}
        visible={visible}
        onVisibleChange={toggleVisible}
        content={
          <div style={dropdownContainerStyle}>
            <RecentDocs visible={visible} />
          </div>
        }
      >
        <span>
          <Space>
            ??????
            <IconChevronDown />
          </Space>
        </span>
      </Dropdown>
    </span>
  );
};
