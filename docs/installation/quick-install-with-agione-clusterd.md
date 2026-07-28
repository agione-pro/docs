# Initialize AGIOne ClusterD

AGIOne ClusterD is a service for managing multiple Kubernetes clusters. It supports the rapid installation of Kubernetes clusters and activation of related components.

AGIOne ClusterD supports the following operating system environments:

1. **Linux:** x86_64 and arm64; common distributions such as Ubuntu 22.04, Ubuntu 20.04, and CentOS 7 are supported.
2. **MacOS:** i386 (Intel-based Macs).

## Installation

### 1. Download the installation package

- [macos-i386](https://wanm.oss-cn-beijing.aliyuncs.com/agione-clusterd/agione-clusterd-macos.tar.gz)
- [linux-x86_64](https://wanm.oss-cn-beijing.aliyuncs.com/agione-clusterd/agione-clusterd-linux-x86_64.tar.gz)
- [linux-arm64](https://wanm.oss-cn-beijing.aliyuncs.com/agione-clusterd/agione-clusterd-linux-arm64.tar.gz)

### 2. Extract and start AGIOne ClusterD

Extract the package, enter the extracted directory, and run one of the following commands:

```bash
bash start.sh
```

Or run it in the background:

```bash
nohup bash start.sh > clusterd.log 2>&1 &
```

## Onboard a Compute Cluster

### Onboard compute nodes

### Add a cluster

1. The default login account is `admin`. Log in with the `admin` account.
2. After logging in, click **Add Cluster**.

![Add cluster](./clusterd-images/add-cluster01.png)

#### Configure the Maintenance node

> **Note:** The Maintenance node is used to manage the agent nodes in the cluster. It can be one of the compute cluster nodes. The Maintenance node primarily receives commands from the user interface and executes them locally.

1. Enter the cluster name and SSH connection credentials as required, and configure **Network mode**. Select **Offline maintenance** only when the nodes being onboarded cannot access the Internet.

   ![Configure the Maintenance node](./clusterd-images/add-cluster01-maintenance.png)

2. After the configuration is complete, save it. In online mode, ClusterD automatically downloads and extracts the cluster configuration and installation package.

#### Initialize the cluster

Configure the cluster network information as shown below. In most cases, you can submit and save the default configuration directly, unless **Service CIDR** or **Cluster CIDR** conflicts with the actual environment.

![Initialize the cluster](./clusterd-images/init-cluster.png)

#### Add and initialize nodes

1. In the **Add nodes** step, click **Add node**.

   ![Add and initialize a node](./clusterd-images/add-node-init.png)

2. Enter the node IP address. This is usually the node's internal network IP. The Maintenance node must be able to access this IP address over SSH. The SSH credentials entered later are the credentials that the Maintenance node uses to access the corresponding node.

   **When fewer than three nodes are onboarded, at least one node must be selected to run the Master/Etcd services. When three or more nodes are onboarded, three nodes must be selected to run the Master/Etcd services.**

3. Configure the GPU model for the node according to the actual hardware, as shown below.

   ![Configure the XPU mode](./clusterd-images/config-xpu-mode.png)

   ![Configure the XPU type](./clusterd-images/config-xpu-type.png)

4. After adding the node, click **Check** to verify that it meets the deployment requirements, including checks for the chip, operating system, storage, and software.

   ![Check node](./clusterd-images/node-check.png)

   ![Node check report](./clusterd-images/node-report.png)

5. If all checks pass, click **Init** to install and deploy the node, then wait for the task to complete.

   ![Initialize the node](./clusterd-images/node-init.png)

### Activate middleware components

1. After the nodes are initialized, go to **Active components**. Components marked **required** must be activated.

   ![Activate cluster components](./clusterd-images/cluster-activate.png)

2. **Device Plugin:** Select the appropriate plugin according to the chip type.

   ![Activate Device Plugin](./clusterd-images/device-plugin-activate.png)

3. **InfluxDB service:** Click **Activate** directly.

   ![Activate InfluxDB service](./clusterd-images/influx-db-activate.png)

4. **Monitor service:** Configure **AI Card mode** according to the actual hardware. The other options can be left at their default values.

   ![Activate Monitor service](./clusterd-images/monitoring-activate.png)

5. **JupyterLab Proxy:** Click **Activate** directly.

   ![Activate JupyterLab Proxy](./clusterd-images/proxy-activate.png)

6. **Tool images:** Click **Activate** directly.

   ![Activate Tool images](./clusterd-images/tool-activate.png)

After all steps are complete, the following screen is displayed, indicating that the deployment has completed successfully.

![Deployment completed](./clusterd-images/full-installed.png)

## Install the Image Service

### Configure image service deployment

1. The cluster must be configured with an image service. One image service can be shared by multiple clusters, or each cluster can have its own image service. The choice usually depends on network connectivity. In an all-in-one deployment, the image service is typically installed on the Maintenance node.

   ![Install Harbor](./clusterd-images/install-harbor.png)

2. Click **Get Disk** to retrieve the available disks on the node. Select a disk with sufficient capacity—typically at least 500 GB—to store image data.

   ![Get available disks](./clusterd-images/get-av-disk.png)

3. Click **Install Harbor**. After installation is complete, click **View Images** to view the image repository. The repository is empty at this point.

   ![View images](./clusterd-images/view-images.png)

### Copy images

After the image repository is created, you can copy images to the Harbor repository from the OneProHuaweiMP Huawei Cloud account's Hong Kong or Guizhou region, as shown below.

![Copy an image](./clusterd-images/copy-image.png)

The remote repository contains commonly used inference frameworks. You can copy the temporary username, password, and repository information into the form.

![Configure the registry](./clusterd-images/config-registry.png)

Submit the form and wait for the image copy operation to complete.

### Notes

1. In the OneProHuaweiMP Huawei Cloud account, images under the `agione-powerone` organization are intended for production use. The `vllm-ascend` image is for Huawei NPU cards; `vllm-openai` and `sglang` are for NVIDIA GPU cards.

   ![SWR registry](./clusterd-images/swr-registry.png)

2. The following image shows how to obtain the relevant authentication information for the OneProHuaweiMP Huawei Cloud account.

   ![SWR authentication](./clusterd-images/swr-auth.png)

3. In the following image, remove `docker pull` from the text highlighted in red to obtain the source image address.

   ![SWR image registry](./clusterd-images/swr-image-registry.png)
