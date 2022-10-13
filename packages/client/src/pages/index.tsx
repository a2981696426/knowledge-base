import { Button, Typography } from '@douyinfe/semi-ui';
import { Seo } from 'components/seo';
import { toLogin, useUser } from 'data/user';
import { TeamWorkIllustration } from 'illustrations/team-work';
import { SingleColumnLayout } from 'layouts/single-column';
import type { NextPage } from 'next';
import Router from 'next/router';
import React, { useCallback } from 'react';

import styles from './index.module.scss';

const { Title, Paragraph } = Typography;

const Page: NextPage = () => {
  const { user } = useUser();

  const start = useCallback(() => {
    if (user) {
      Router.push(`/app`);
    } else {
      toLogin();
    }
  }, [user]);

  const toGithub = useCallback(() => {
    window.open('');
  }, []);

  return (
    <SingleColumnLayout>
      <Seo title="主页" />
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles.content}>
            <div>
              <div>
                <Title style={{ marginBottom: 12 }}>知识库</Title>
                <Paragraph type="tertiary">
                  知识库是一款开源知识管理工具。通过独立的知识库空间，结构化地组织在线协作文档，实现知识的积累与沉淀，促进知识的复用与流通。
                </Paragraph>
              </div>
              <div style={{ margin: '32px 0' }}>
                <Button theme="solid" onClick={start}>
                  开始使用
                </Button>
                <Button style={{ marginLeft: 12 }} onClick={toGithub}>
                  获取帮助
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.hero}>
            <TeamWorkIllustration />
          </div>
        </div>
      </div>
    </SingleColumnLayout>
  );
};

export default Page;
